// preload.js
window.addEventListener('DOMContentLoaded', () => {
    const { contextBridge, ipcRenderer } = require('electron');
  
    contextBridge.exposeInMainWorld('electron', {
      // Thêm các API Electron tùy chỉnh vào đây
    });
  
    // Gửi sự kiện từ trang web đến quy trình Electron chính
    window.addEventListener('message', (event) => {
      const message = event.data;
      ipcRenderer.send('webview-message', message);
    });
  });
  