export function consoleLogQR(data) {
  var logElement = document.getElementById('logQR');
  logElement.innerHTML = ""
  logElement.innerHTML += data + '\n';
}