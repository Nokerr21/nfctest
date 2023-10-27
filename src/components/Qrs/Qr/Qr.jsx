import React from "react";


export function Qr({ id, title, batchNumber, writeTag, deleteQr, logSelectedQr, disableButtons }){
    return (
        <li>
            <pre className="litem">
                {title}
            </pre>
            <button onClick={() => deleteQr(id)} className="btn btn-danger">DELETE</button>
            <button id="writeButtonList" onClick={() => {logSelectedQr(title) ; writeTag(title, batchNumber); disableButtons()}} className="btn">WRITE TO NFC</button>
        </li>
    );

}