// frontend/preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, fn) => {
    ipcRenderer.on(channel, (_, ...args) => fn(...args))
  }
})
