// frontend/electron-main.cjs
const { app, BrowserWindow, Menu } = require('electron'); // Added Menu
const path = require('node:path');
const isDev = require('electron-is-dev');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200, // Initial width, can be adjusted
    height: 800, // Initial height, can be adjusted
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Assuming you have/will have a preload.js
      contextIsolation: true,
      nodeIntegration: false, // Recommended for security
      devTools: isDev, // Enable DevTools only in development mode
    },
  });

  // URL of your Vite development server
  const viteDevServerUrl = 'http://localhost:5174'; // CORRECTED PORT

  if (isDev) {
    mainWindow.loadURL(viteDevServerUrl);
    // Open DevTools automatically in development, you can comment this out if not needed
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built index.html file
    // Vite typically builds to 'dist' inside the project root (frontend in this case)
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // To remove the default application menu (File, Edit, View, etc.)
  // This makes the window cleaner, like a typical app.
  // You can enable this once you are happy with the main functionality.
  // Menu.setApplicationMenu(null); // For Windows/Linux
  // mainWindow.setMenu(null); // Alternative, sometimes more effective

  // For macOS, to remove the default menu and only have basic window controls,
  // you might need a more nuanced approach or a frameless window if you want full control.
  // Setting the menu to null often works well enough for a cleaner look on all platforms.
  // If you want NO menu bar at all, even on macOS, you might need:
  if (process.platform !== 'darwin') { // Keep standard macOS app menu behavior by default
     mainWindow.setMenu(null);
  } else {
    // Optionally create a very minimal menu for macOS if needed, or set to null
    // const minimalMenu = Menu.buildFromTemplate([{ role: 'appMenu' }, { role: 'windowMenu' }]);
    // Menu.setApplicationMenu(minimalMenu);
    // Or, to completely remove it (might make app feel less native on macOS):
    // Menu.setApplicationMenu(null);
  }

}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  // Quit when all windows are closed, except on macOS.
  if (process.platform !== 'darwin') app.quit();
});
