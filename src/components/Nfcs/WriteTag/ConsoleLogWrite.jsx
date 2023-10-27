export function consoleLogWrite(data) {
    var logElement = document.getElementById('logWrite');
    logElement.innerHTML = ""
    logElement.innerHTML += data + '\n';
}