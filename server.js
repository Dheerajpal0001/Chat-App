const express = require('express')
const app = express()
const http = require('http')
const path = require('path');
const Server = http.createServer(app)
const socketTo = require('socket.io')
const dotenv = require('dotenv');

dotenv.config();
app.use(express.static(path.join(__dirname + '/public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Socket 
// const io = require('socket.io')(http)
const io = socketTo(Server)

io.on('connection', (socket) => {
  // console.log('Connected...')
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
})

Server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`)
})

