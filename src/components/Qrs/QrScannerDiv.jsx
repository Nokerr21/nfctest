import React from "react";

export default class QrScannerDiv extends React.Component {
    render () {
        return (
            <div className="form-row">
                <label>READ QR CODE</label>
                <div id="readerQR"></div>
                <pre className="log" id="logQR"></pre>
            </div>
        );
    }
}