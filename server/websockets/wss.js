export default (ws, req) => {

    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    // app.sessionParser(req.upgradeReq, {}, () => {
    //     // console.log(req.upgradeReq);
    //     // do stuff with the session here
    // });
}

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    ws.send(`recebido!`);
}
