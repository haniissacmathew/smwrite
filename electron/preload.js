const { contextBridge, ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
 
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })
  contextBridge.exposeInMainWorld('electron', {
    onEventFromMain: (callback) => ipcRenderer.on('event-from-main', callback),
    onNavigate: (callback) => ipcRenderer.on('navigate', callback),
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    createFile: (filePath, content) => ipcRenderer.invoke('create-file', filePath, content)
  });