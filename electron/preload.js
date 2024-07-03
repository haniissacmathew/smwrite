const { contextBridge, ipcRenderer } = require('electron');
// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
 
//     for (const dependency of ['chrome', 'node', 'electron']) {
//       replaceText(`${dependency}-version`, process.versions[dependency])
//     }
//   })
  contextBridge.exposeInMainWorld('electron', {
    // onEventFromMain: (callback) => ipcRenderer.on('event-from-main', callback),
    // onFileOpen: (callback) => ipcRenderer.on('file-opened', callback),
    // onLastOpenedFile: (callback) => ipcRenderer.on('last-opened-file', callback),
    // onNavigate: (message) => ipcRenderer.send('navigate', message),
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    createFile: (filePath, content) => ipcRenderer.invoke('create-file', filePath, content),
    saveFile: ( content) => ipcRenderer.invoke('save-file', content),
    ipcRenderer: {
      send: (channel, data) => ipcRenderer.send(channel, data),
      on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
      // once: (channel, func) => ipcRenderer.once(channel, (event, ...args) => func(...args)),
      removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
    }
  }); 