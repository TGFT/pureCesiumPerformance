var express =  require('express');
var app =express();
var http = require('http');
var httpServer = http.createServer(app);
var io = require('socket.io')(httpServer);


app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});
httpServer.listen(3000, function(){
  console.log('listening on *:3000');
});


const numOfEntities = 500;
const interval =2;

io.on('connection', function (socket) {
    let counter = 0;
    setInterval(()=>{
    socket.emit('birds',
        {
            id: counter++ % numOfEntities,
            action: 'ADD_OR_UPDATE',
            entity: {
                name: 'bird',
                image: "/assets/angry-bird-blue-icon.png"
            }
        })
}, interval);
});