import "./styles.css"
import { useEffect, useState } from "react"
import Nfcs from "./components/Nfcs/Nfcs"
import Nav from "./components/Nav/Nav"
import { QrList } from "./components/Qrs/QrList"
import { WriteNfcDiv } from "./components/Nfcs/WriteNfcDiv"
import { renderQrScanner } from "./components/Qrs/RenderQrScanner/RenderQrScanner"
import QrScannerDiv from "./components/Qrs/QrScannerDiv"
import { newBatchNumber } from "./components/BatchNumber/NewBatchNumber"






export default function App(){
  const [scanResult, setScanResult] = useState("")
  const [scanTime, setScanTime] = useState("")
  const [batchNumber, setBatchNumber] = useState(newBatchNumber())

  const [QRs, setQRs] = useState(() => {
    const localValue = localStorage.getItem("QRs")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })


  useEffect(() =>{
    localStorage.setItem("QRs", JSON.stringify(QRs))
  }, [QRs])
  

  useEffect(() => {
    renderQrScanner(setQRs, setScanResult, setScanTime)
  }, [scanTime])


  function handleSubmit(e) {
    e.preventDefault()
  }


  function deleteQR(id){
    setQRs(currentQRs => {
      return currentQRs.filter(QR => QR.id !== id)
    })
  }

  return (
  <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <Nav />
      <Nfcs />
      <div className="form-row">
        <QrScannerDiv />
        <WriteNfcDiv scanResult={scanResult} />
      </div>
    </form>
    <QrList qrs={QRs} deleteQr={deleteQR} setBatchNumber={setBatchNumber} batchNumber={batchNumber} />
  </>
  )
}