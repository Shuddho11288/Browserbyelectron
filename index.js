const { app, BrowserWindow, ipcMain ,shell} = require('electron');
const path =require('path');
var win;
function createWindow() {
    win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webviewTag: true,
            contextIsolation:false
        },
        icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'My App',
    });

   
    win.loadFile(path.join(__dirname,'index.html'));
    win.webContents.session.on("will-download",(event,item)=>{
        item.on("updated",(e,s)=>{
            var item_details={
                name: item.getFilename(),
                totalsize: ((item.getTotalBytes()/1024)/1024).toFixed(2),
                donesize: ((item.getReceivedBytes()/1024)/1024).toFixed(2)
            }
            win.webContents.send("byte",item_details)
        })
        item.once("done",()=>{
            win.webContents.send("done","done")
        })
    })
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('web-contents-created',(e,content)=>{
    if (content.getType() == "webview"){
        content.on("new-window",(e,url)=>{
            win.webContents.send("url",url)
            console.log(url)
        })
        
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});