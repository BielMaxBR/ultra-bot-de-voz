import WebSocket from "ws";

import app from "../server.js"

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    ws.send(`recebido!`);
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    // app.sessionParser(req.upgradeReq, {}, () => {
    //     // console.log(req.upgradeReq);
    //     // do stuff with the session here
    // });
    console.log(Object.keys(req))
}

export default (server) => {
    const wss = new WebSocket.Server({
        server,
        path: "/ws"
    });

    wss.on('connection', onConnection);

    console.log(`websocket iniciado`);
    return wss;
}