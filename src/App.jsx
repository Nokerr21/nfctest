import "./styles.css"
import { useEffect, useState } from "react"
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode"
import { QrCodeScanner } from "./QrCodeScanner"






export default function App(){
  
  const [scanResult, setScanResult] = useState("")
  const [scanTime, setScanTime] = useState("")
  const [scannerState, setScannerState] = useState("")
  const [newQR, setNewQR] = useState("")
  const [batchNumber, setBatchNumber] = useState(newBatchNumber())
  const [QRs, setQRs] = useState(() => {
    const localValue = localStorage.getItem("QRs")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  const digits = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const indexLength = 10

  
  useEffect(() =>{
    localStorage.setItem("QRs", JSON.stringify(QRs))
  }, [QRs])
  

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "readerQR", { fps: 5, qrbox: 250 });

    html5QrcodeScanner.render(onScanSuccess, onScanError);
    console.log(html5QrcodeScanner.getState()  + " drugi");

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
          
    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanResult(decodedText);
        setScanTime(dateTime);
        consoleLogQR("Message: '" + decodedText + "' decoded!" + "\n" + "TimeStamp: " + dateTime);
        setNewQR(decodedText);
        console.log(decodedText.getBytes)
        if (decodedText != ""){
          setQRs((currentQRs) => {
            return [... currentQRs, {id: crypto.randomUUID(), title: decodedText, completed: false}, ]
          })
        }
        console.log(html5QrcodeScanner.getState()  + " trzeci");
        html5QrcodeScanner.clear();
    }

    function onScanError(err){
    }
  }, [scanTime])


    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleSubmitQRList(e) {
      e.preventDefault()
      if (newQR != ""){
        setQRs((currentQRs) => {
          return [... currentQRs, {id: crypto.randomUUID(), title: newQR, completed: false}, ]
        })
      }
  }

  function toggleQR(id, completed){
    setQRs(currentQRs => {
      return currentQRs.map(QR => {
        if(QR.id === id) {
          return { ...QR, completed}
        }
        return QR
      })
    })
  }

  function deleteQR(id){
    setQRs(currentQRs => {
      return currentQRs.filter(QR => QR.id !== id)
    })
  }

  
    async function readTag() {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          try {
            await ndef.scan();
            ndef.onreading = event => {
              const decoder = new TextDecoder();
              for (const record of event.message.records) {
                //consoleLog("Record type:  " + record.recordType);
                //consoleLog("MIME type:    " + record.mediaType);
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
                var dateTime = date+' '+time;
                consoleLog("---- data ----\n" + decoder.decode(record.data) + "\n" + "TimeStamp: " + dateTime);
              }
            }
          } catch(error) {
            consoleLog(error);
          }
        } else {
          consoleLog("Web NFC is not supported.");
        }
      }


      function newBatchNumber(){
        var today = new Date();
        var batchNumber = today.getDate().toString() + (today.getMonth()+1).toString() + (today.getYear()-100).toString() + '-' + today.getHours().toString() + today.getMinutes().toString();
        return batchNumber;
      }

      function disableButtons(){
        var buttons = document.querySelectorAll('ul.list button.btn')
        var checkBox = document.getElementById("batchCheck");
        var buttonInDiv = document.getElementById("btn-write");
        if(checkBox.checked == true) {
          buttons.forEach((button) => {button.disabled = true;});
          buttonInDiv.disabled = true;
        }
      }

      function enableButtons(){
        var buttons = document.querySelectorAll('ul.list button.btn')
        var buttonInDiv = document.getElementById("btn-write");
        buttons.forEach((button) => {button.disabled = false;});
        buttonInDiv.disabled = false;
      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
      async function writeTag(message, times = 2) {
        var checkBox = document.getElementById("batchCheck");
        console.log(message);
        //setMess(message);
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
        //  const byteSize = str => new Blob([str]).size;
        //  consoleLogWriteTest(byteSize(message))
          try {
            await ndef.write(message);
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
            var dateTime = date+' '+time;
            var index = ""
            for (let iter = 0; iter < indexLength; iter++) {
              let randNum = Math.floor(Math.random() * digits.length);
              index += digits.substring(randNum, randNum + 1);
            }
            if (checkBox.checked == true){
              consoleLogWrite("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime + "\n" + "Index: " + index + "\n" + "BatchNumber: " + batchNumber);
              console.log(message + "@@@@@@@@@@@@@@@@@@@@@@");
              await sleep(1000);
              await writeTag(message);
            }
            else{
              consoleLogWrite("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime + "\n" + "Index: " + index);
            }

          } catch(error) {
            //consoleLogWrite(error);
            if (times > 0 && error.name != 'AbortError') {
              consoleLogWrite(error + "\n"+ "Can't write tag! try " + times + " more times!");
              return await writeTag(message, times - 1);
            }
            //consoleLogWrite(error.code);
            else if(error.name == 'AbortError'){
              //return await writeTag(message, times - 2)
              consoleLogWriteTest(error.message)
            }
            else{
              consoleLogWriteTest(error.message)
            }
          }
        } else {
          consoleLogWrite("Web NFC is not supported.");
        }
      }

      //async function generateIndex(){
       // const digits = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
       // const indexLength = 10
       // var index = ""
        //for (let iter = 0; iter < indexLength; iter++) {
         // let randNum = Math.floor(Math.random() * digits.length);
         // index += digits.substring(randNum, randNum + 1);
       // }
       // return index
      //}
      
      function consoleLog(data) {
        var logElement = document.getElementById('log');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

      function consoleLogWrite(data) {
        var logElement = document.getElementById('logWrite');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

      function consoleLogWriteTest(data) {
        var logElement = document.getElementById('logWriteTest');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

      function consoleLogQR(data) {
        var logElement = document.getElementById('logQR');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

      function consoleLogListMess(data) {
        var logElement = document.getElementById('logListMess');
        logElement.innerHTML = ""
        logElement.innerHTML += "Selected QR code: " + data + '\n';
      }

      function consoleLogBatchNumber(data) {
        var logElement = document.getElementById('logBatchNumber');
        var checkBox = document.getElementById("batchCheck");
        logElement.innerHTML = ""
        if(checkBox.checked == true){
          logElement.innerHTML += "Current Batch Number: " + data + '\n';
        }
        else{
          logElement.innerHTML = ""
        }
        
      }
      
    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
            <nav className="nav">
              <label className="site-title">
                NFCONTROL
              </label>
              <ul>
                <a href="https://nokerr21.github.io/nfcontrol/">About</a>
              </ul>
            </nav>
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <pre className="log" id="log"></pre>
            </div>
            <div className="form-row">
              <label>READ QR CODE</label>
              <div id="readerQR"></div>
              <pre className="log" id="logQR"></pre>
              <button onClick={() => writeTag(scanResult)} className="btn" id="btn-write">WRITE QR TO NFC</button>
              <pre className="log" id="logWriteTest"></pre>
              <pre className="log" id="logWrite"></pre>
            </div>
        </form>
        <div className="classic-row">
          <h1 className="header">SCANNED QR CODES</h1>
          <label>
            <input type="checkbox" id="batchCheck" onClick={() => {setBatchNumber(newBatchNumber()); enableButtons(); consoleLogBatchNumber(batchNumber)}}/>
            SERIAL WRITING
          </label>
          <pre className="log-info" id="logListMess"></pre>
          <pre className="log-info" id="logBatchNumber"></pre>
          <ul className="list">
            {QRs.length === 0 && "No QR codes stored"}
            {QRs.map(QR => {
              return (
              <li key={QR.id}>
                <pre className="litem">
                  {QR.title}
                </pre>
                <button onClick={() => deleteQR(QR.id)} className="btn btn-danger">DELETE</button>
                <button id="writeButtonList" onClick={() => {consoleLogListMess(QR.title) ; writeTag(QR.title); disableButtons()}} className="btn">WRITE TO NFC</button>
              </li>
              )
            })}
          </ul>
        </div>
        </>
    )
}