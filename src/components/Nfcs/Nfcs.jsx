import "../../styles.css"
import React from "react";
import readTag from "./ReadTag/ReadTag";


export default class Nfcs extends React.Component {
    render () {
        return (
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <pre className="log" id="log"></pre>
            </div>
        );
    }
}