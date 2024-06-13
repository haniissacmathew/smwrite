const path = require('path');
const { app, BrowserWindow,Menu  } = require('electron');
 
const isDev = process.env.IS_DEV == "true" ? true : false;
const menuTemplate = [
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', click: () => console.log('Undo clicked') },
      { label: 'Redo', click: () => console.log('Redo clicked') },
      { type: 'separator' }, // Add a separator line
      { label: 'Cut', click: () => console.log('Cut clicked') },
      { label: 'Copy', click: () => console.log('Copy clicked') },
      { label: 'Paste', click: () => console.log('Paste clicked') },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Fullscreen',
        click: () => {
          const win = BrowserWindow.getFocusedWindow();
          win.setFullScreen(!win.isFullScreen());
        },
      },
    ],
  },
];
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    autoHideMenuBar: false,
    resizable: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });
 
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });
 
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  mainWindow.setMenu(mainMenu);
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
 
}
 
 
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});
 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});