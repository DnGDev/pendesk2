// ===========================
//          Updater
// ===========================
require('simple-git')(__dirname + '/bin')
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
//var app = require("electron");
//var BrowserWindow = require("browser-window");
//var Menu = require("menu");
//var mainWindow = null;
const {app, BrowserWindow, Menu} = require('electron');
  const path = require('path');
  const url = require('url');
//  const Menu = require("electron"); // THIS THING BROKE BRO

app.on("window-all-closed", function(){
    app.quit();
});

app.on("ready", function () {
    mainWindow = new BrowserWindow({
        width: 980,
        height: 650,
        "min-width": 980,
        "min-height": 650
    });
//  mainWindow.openDevTools();
    mainWindow.loadURL("file://" + __dirname + "/bin/index.html");
    mainWindow.on("closed", function () {
        mainWindow =  null;
    });

    // Create the Application's main menu
    var template = [{
        label: "PenDesk",
        submenu: [
            { label: "About PenDesk", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
