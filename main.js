const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './logo.icns',
    webPreferences: {
      contextIsolation: true,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  });

  mainWindow.loadURL('http://chat.zalo.me');

  const reloadButton = new BrowserWindow({
    parent: mainWindow,
    show: false
  });
  reloadButton.loadURL('data:text/html,<!DOCTYPE html><html><body><button onclick="location.reload()">Reload</button></body></html>');
  mainWindow.setBrowserView(reloadButton);

  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36';
  mainWindow.webContents.setUserAgent(userAgent);
}

function initializeApp() {
  app.whenReady().then(createWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

initializeApp();
