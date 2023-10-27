import React from "react";
import writeTag from "./WriteTag/WriteTag"


export function WriteNfcDiv( {scanResult} ) {
    return (
        <div className="form-row">
            <button onClick={() => writeTag(scanResult)} className="btn" id="btn-write">WRITE QR TO NFC</button>
            <pre className="log" id="logWriteTest"></pre>
            <pre className="log" id="logWrite"></pre>
        </div>
    );
}