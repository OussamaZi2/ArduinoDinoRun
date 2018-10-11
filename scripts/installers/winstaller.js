var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './build/packaged/build-win32/win-unpacked/',
    outputDirectory: './build/production/winstaller/production-win32/',
    authors: 'Eliyahu Georgios',
    setupExe: 'dinorun-win32-setup.exe',
    loadingGif: './icons/gif/loading.gif'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`Error: ${e.message}`));
