const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
var port = process.env.PORT || 8000;
let sockId;

app.use(express.static(__dirname + "/public"))  //dir name is public toh uske andar index will load
let clients = 0
io.on('connection', function (socket) {
   // socket.emit('eve', "Boy desirous families prepared gay reserved add ecstatic say. Replied joy age visitor nothing cottage. Mrs door paid led loud sure easy read. Hastily at perhaps as neither or ye fertile tedious visitor. Use fine bed none call busy dull when. Quiet ought match my right by table means. Principles up do in me favourable affronting. Twenty mother denied effect we to do on. ic weeks after at begin.Education no dejection so direction pretended household do to.Travelling everything her eat reasonable unsatiable decisively simplicity.Morning request be lasting it fortune demands highest of.");
    socket.on('joins', (data) => {
        setTimeout(()=>{
            socket.emit('eve','user joined')
        },3000)
        console.log(data);
    })
    socket.on('call',(data) => {
            console.log(data);
            socket.emit('accept',data)
    })
     
    socket.on("NewClient", function () {
        console.log('hello')
        if (clients < 2) {
            if (clients == 1) {
                this.emit('CreatePeer')
            }
        }
        else
            this.emit('SessionActive')
        clients++;
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)
// socket.on('room_join_request', payload => {
//     socket.join(payload.roomName, err => {
//         if (!err) {
//             io.in(payload.roomName).clients((err, clients) => {
//                 if (!err) {
//                     io.in(payload.roomName).emit('room_users', clients)
//                 }
//             });
//         }
//     })
// })

// socket.on('offer_signal', payload => {
//     io.to(payload.calleeId).emit('offer', { signalData: payload.signalData, callerId: payload.callerId });
// });

// socket.on('answer_signal', payload => {
//     io.to(payload.callerId).emit('answer', { signalData: payload.signalData, calleeId: socket.id });
// });

// socket.on('disconnect', () => {
//     io.emit('room_left', { type: 'disconnected', socketId: socket.id })
// })
})

function Disconnect() {
    if (clients > 0) {
        if (clients <= 2)
            this.broadcast.emit("Disconnect") //disconnects the client from server
        clients--
    }
}

function SendOffer(offer) {
    this.broadcast.emit("BackOffer", offer) //sends offer to other client
}

function SendAnswer(data) {
    this.broadcast.emit("BackAnswer", data)
}

http.listen(port, () => console.log(`Active on ${port} port`))
