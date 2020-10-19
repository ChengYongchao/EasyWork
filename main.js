// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')


//创建弹出列表
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // 打开调试工具
  mainWindow.webContents.openDevTools()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  
  //进度条
  //mainWindow.setProgressBar(0.5)
  
  //设置缩略图
  /*mainWindow.setThumbarButtons([
	  {
		tooltip: 'button1',
		icon: path.join(__dirname, 'button1.png'),
		click () { console.log('button1 clicked') }
	  }, {
		tooltip: 'button2',
		icon: path.join(__dirname, 'button2.png'),
		flags: ['enabled', 'dismissonclick'],
		click () { console.log('button2 clicked.') }
	  }
  ])*/
  
  //设置叠加框
  //mainWindow.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
  
  //设置闪烁
  //mainWindow.once('focus', () => win.flashFrame(false))
  //mainWindow.flashFrame(false)
}


let onlineStatusWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)

})



ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
