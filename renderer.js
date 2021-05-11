const {ipcRenderer} = require("electron");

function OpenUrl(){
    var url = document.getElementById("uri").value
    var view = document.getElementById("view")
    if (url.startsWith("http")||url.startsWith("https://")||url.startsWith("www.")||url.endsWith("com")){
        view.loadURL(url)
        console.log(url)
    }
    else{
        url = "https://www.google.com/search?q="+url
        console.log(url)
        view.loadURL(url)
        
    }

}
ipcRenderer.on("url",(event,data)=>{
    var view = document.getElementsByTagName("webview")[0]
    view.loadURL(data)
})
ipcRenderer.on("byte",(e,d)=>{
    document.getElementById("d").innerHTML = `${d.name} : ${d.donesize}/${d.totalsize}`.toString()
})
ipcRenderer.on("done",(e,d)=>{
    alert("Done")
    document.getElementsByClassName("currentdownload")[0].innerHTML = "No Downloads"
})