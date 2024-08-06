const express = require('express')
const app = express()
const http = require('http')
const Server = http.createServer(app)
const socketTo = require('socket.io')


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Socket 
// const io = require('socket.io')(http)
const io = socketTo(Server , {
  cors:{
    origin:`https://chat-app-phi-amber-47.vercel.app/`,
    methods: ['GET','POST']
  }
})

io.on('connection', (socket) => {
  console.log('Connected...')
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })

})
const PORT = process.env.PORT || 3000

Server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

