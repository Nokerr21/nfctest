import React from "react";
import { Qr } from "./Qr/Qr";
import { newBatchNumber } from "../BatchNumber/NewBatchNumber";
import { logBatchNumber } from "../BatchNumber/LogBatchNumber";
import { enableButtons } from "../ButtonActions/EnableButtons";
import { disableButtons } from "../ButtonActions/DisableButtons";
import writeTag from "../Nfcs/WriteTag/WriteTag";
import { logSelectedQr } from "./QrLog/LogSelectedQr";


export function QrList({ qrs, deleteQr, setBatchNumber, batchNumber }) {
    return (
        <div className="classic-row">
            <h1 className="header">SCANNED QR CODES</h1>
            <label>
                <input type="checkbox" id="batchCheck" onClick={() => {setBatchNumber(newBatchNumber()); enableButtons(); logBatchNumber(batchNumber)}}/>
                SERIAL WRITING
            </label>
            <pre className="log-info" id="logListMess"></pre>
            <pre className="log-info" id="logBatchNumber"></pre>
            <ul className="list">
                {qrs.length === 0 && "No QR codes stored"}
                {qrs.map(qr => {
                return (
                    <Qr
                        {... qr}
                        key={qr.id}
                        batchNumber={batchNumber}
                        writeTag={writeTag}
                        deleteQr={deleteQr}
                        logSelectedQr={logSelectedQr}
                        disableButtons={disableButtons} 
                    />
                )})}
            </ul>
        </div>
        
    );
}