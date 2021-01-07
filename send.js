const WebSocket = require('ws');//引入模块
const wss = new WebSocket.Server({
	port: 8080,
});

wss.on('connection', function connection(ws,req) {
  ws.on('message', function incoming(message) {
    let temp = JSON.parse(message)
    console.log(temp)
    switch(temp.type){
      case "OPEN":temp.value = wss.clients.size;temp.type = "NUMBER";break;
      case "CLOSE": temp.value = wss.clients.size-1;temp.type = "NUMBER";break;
    }
    broadcast(JSON.stringify(temp))
  });
})

function broadcast(mes){
  wss.clients.forEach((item) => {
    item.send(mes)
  })
}
console.log('started')