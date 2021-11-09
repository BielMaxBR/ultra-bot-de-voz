import WebSocket from "ws";
 
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
    console.log(`onConnection`);
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