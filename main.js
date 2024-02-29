// Electron 모듈에서 필요한 모듈 및 객체를 가져옵니다.
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main');

// 노드의 path 모듈을 가져옵니다.
const path = require('node:path');

// 윈도우를 생성하는 함수를 정의합니다.
function createWindow () {
  // 새로운 브라우저 창을 생성합니다.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload 스크립트를 지정합니다.
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 인덱스 파일을 로드합니다.
  win.loadFile('index.html');
}

// 다크 모드 토글을 처리하는 IPC 핸들러를 정의합니다.
ipcMain.handle('dark-mode:toggle', () => {
  // 네이티브 테마에서 어두운 색상을 사용해야 하는지 확인합니다.
  if (nativeTheme.shouldUseDarkColors) {
    // 어두운 테마를 끕니다.
    nativeTheme.themeSource = 'light';
  } else {
    // 어두운 테마를 켭니다.
    nativeTheme.themeSource = 'dark';
  }
  // 현재 어두운 테마가 활성화되어 있는지 여부를 반환합니다.
  return nativeTheme.shouldUseDarkColors;
});

// 시스템 테마를 사용하는 IPC 핸들러를 정의합니다.
ipcMain.handle('dark-mode:system', () => {
  // 시스템 테마를 사용합니다.
  nativeTheme.themeSource = 'system';
});

// 애플리케이션이 준비되면 윈도우를 생성합니다.
app.whenReady().then(() => {
  createWindow();

  // 애플리케이션이 활성화되면 윈도우를 생성합니다.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창이 닫히면 애플리케이션을 종료합니다.
app.on('window-all-closed', () => {
  // macOS가 아니면 애플리케이션을 종료합니다.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
