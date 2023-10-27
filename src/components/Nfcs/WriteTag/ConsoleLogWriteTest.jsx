export function consoleLogWriteTest(data) {
    var logElement = document.getElementById('logWriteTest');
    logElement.innerHTML = ""
    logElement.innerHTML += data + '\n';
}