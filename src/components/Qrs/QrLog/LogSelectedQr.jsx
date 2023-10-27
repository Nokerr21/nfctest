export function logSelectedQr(data) {
  var logElement = document.getElementById('logListMess');
  logElement.innerHTML = ""
  logElement.innerHTML += "Selected QR code: " + data + '\n';
}