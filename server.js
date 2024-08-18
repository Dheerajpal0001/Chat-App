const express = require('express')
const app = express()
const http = require('http')
const Server = http.createServer(app)
const socketTo = require('socket.io')
const dotenv = require('dotenv');

dotenv.config();
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Socket 
// const io = require('socket.io')(http)
const io = socketTo(Server)

io.on('connection', (socket) => {
  console.log('Connected...')
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
  socket.on("disconnect", (data) => {
    socket.broadcast.emit('disconnect', data);
  });
})

Server.listen(process.env.PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`)
})

