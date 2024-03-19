const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    frame: false,
    minHeight: 560,
    minWidth: 940,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false, //IMPORTANTE PARA LA MANIPULACION DE BARRA DE TITULO EN FALSE
      // enableRemoteModule: true,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("BARRA_TITULO/index.html");
  // win.webContents.openDevTools();
  //============================================================//
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });

  ipcMain.on("maximize-window", () => {
    if (win) {
      if (win.isMaximized()) {
        win.restore();
      } else {
        win.maximize();
      }
    }
  });
  //============================================================//
  ipcMain.on("close-window", () => {
    app.quit();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
