// ===========================
//          Updater
// ===========================
require('simple-git')(__dirname + '/zenpen')
     .pull()
     .tags((err, tags) => console.log("Latest available tag: %s", tags.latest));

// Update repo and when there are changes, restart the app
require('simple-git')()
     .pull((err, update) => {
        if(update && update.summary.changes) {
           require('child_process').exec('npm restart');
        }
     });
// ===========================
//          Electron
// ===========================
const {app, BrowserWindow} = require('electron');
  const path = require('path');
  const url = require('url');

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win

  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
    width: 900,
    height: 800,
    title: "PenDesk ~ ZenDesk for PC by Graham Dianaty",
    icon: path.join(__dirname, 'ico/png/64x64.png')
  });

    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, '/zenpen/index.html'),
      protocol: 'file:',
      slashes: true
    }));

    // Open the DevTools.
//    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
      win = null;
    });
  }

  app.on('ready', createWindow); // Start

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
