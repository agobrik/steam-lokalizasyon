const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'Steam Lokalizasyon'
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    const port = process.env.VITE_PORT || 5173;
    mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// File operations
ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Localization Files', extensions: ['txt', 'json', 'xml', 'po', 'vdf'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const content = await fs.readFile(filePath, 'utf-8');
    return {
      path: filePath,
      content,
      name: path.basename(filePath)
    };
  }

  return null;
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }

  return null;
});

ipcMain.handle('save-file', async (event, { content, defaultPath }) => {
  const result = await dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: 'Localization Files', extensions: ['txt', 'json', 'xml', 'po', 'vdf'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePath) {
    await fs.writeFile(result.filePath, content, 'utf-8');
    return result.filePath;
  }

  return null;
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    throw error;
  }
});

ipcMain.handle('write-file', async (event, { filePath, content }) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    throw error;
  }
});
