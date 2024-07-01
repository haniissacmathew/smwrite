const path = require("path");
const fs = require("fs");
const Store = require("electron-store");
const store = new Store();
const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const isDev = process.env.IS_DEV == "true" ? true : false;
let mainWindow;
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Project",
        click: () => {
          console.log("naavigate");
          mainWindow.webContents.send("navigate", "/new-project");
        },
      },
      {
        label: "Open Project",
        click: () => {
          openFile();
        },
      },
      {
        label: "Save Project",
        click: () => {
          saveFile();
        },
      },
      {
        label: "Export to PDF",
        click: () => {
          exportProject();
        },
      },
      {
        label: "Home",
        click: () => {
          mainWindow.webContents.send("navigate", "/");
        },
      },
      { type: "separator" }, // Add a separator line
    ],
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", click: () => console.log("Undo clicked") },
      { label: "Redo", click: () => console.log("Redo clicked") },
      { type: "separator" }, // Add a separator line
      { label: "Cut", click: () => console.log("Cut clicked") },
      { label: "Copy", click: () => console.log("Copy clicked") },
      { label: "Paste", click: () => console.log("Paste clicked") },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Toggle Fullscreen",
        click: () => {
          const win = BrowserWindow.getFocusedWindow();
          win.setFullScreen(!win.isFullScreen());
        },
      },
    ],
  },
];
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: false,
    resizable: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  mainWindow.webContents.on("did-finish-load", () => {
    // Send the last opened file to the renderer process
    const lastFile = store.get("lastOpenedFile");
    if (lastFile) {
      mainWindow.webContents.send("last-opened-file", lastFile);
    }
  });
  mainWindow.setMenu(mainMenu);
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// Handle select folder
ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return result.filePaths;
});
// Handle file creation
ipcMain.handle("create-file", async (event, filePath, content) => {
  try {
    console.log("create file", filePath, content);
    fs.writeFileSync(filePath, content);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
ipcMain.handle("save-file", async (event, content) => {
  const filePath = store.get("lastOpenedFile");
  console.log('lastOpenedFile',filePath,content);
  if (filePath) {
    try {
      fs.writeFileSync(filePath, content);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
function saveFile() {
  console.log("saveFile");
  mainWindow.webContents.send("save-file-triggered");
}
function openFile() {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ["openFile"],
    })
    .then((result) => {
      if (!result.canceled) {
        const filePath = result.filePaths[0];
        // Save the last opened file path
        store.set("lastOpenedFile", filePath);
        // Send the file path to the renderer process
        // mainWindow.webContents.send("file-opened", filePath);
        readFileContent(filePath); // Read and send the file content
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function exportProject() {
  mainWindow.webContents.send("export-project");
}
app.on("open-file", openFile);
function readFileContent(filePath) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    console.log("File content:", data);
    mainWindow.webContents.send("file-content", {
      data: data,
      filePath: filePath,
    });
  });
}
