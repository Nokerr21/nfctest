import consoleLog from "./ConsoleLog";


export default async function readTag() {
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
  } 
  else {
    consoleLog("Web NFC is not supported.");
  }
}