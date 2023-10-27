export default function consoleLog(props) {
  var logElement = document.getElementById('log');
  logElement.innerHTML = ""
  logElement.innerHTML += props + '\n';
}