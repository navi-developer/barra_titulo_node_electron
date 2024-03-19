const { ipcRenderer } = require('electron/renderer');
const ipc = ipcRenderer;
document.getElementById('minimizeBtn').addEventListener('click', () => {
    ipc.send('minimize-window');
});
document.getElementById('maximizeBtn').addEventListener('click', () => {
    ipc.send('maximize-window');
});
document.getElementById('closeBtn').addEventListener('click', () => {
    ipc.send('close-window');
});
