const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () => ipcRenderer.invoke('select-file'),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (data) => ipcRenderer.invoke('write-file', data)
});
