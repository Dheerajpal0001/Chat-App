// const express = require('express')

// const { Server } = require("socket.io");


// const app = express()


// const http = require('http').createServer(app)


// const PORT = process.env.PORT || 3000


// http.listen(PORT, ()=>{
//     console.log(`Listening on port ${PORT}`)
// })


// app.use(express.static(__dirname + '/public'))


// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/index.html');
// })



// // socket

// const io = new Server(http);

// io.on("connection", (socket) => {
//   // ...
//   console.log("Connected.....")
  
//   socket.on('message', (msg)=>{
//     // console.log(msg);
//     socket.broadcast.emit('message', msg);
//   })
// });

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// Use CORS middleware for Express
app.use(cors({
  origin: 'http://localhost:3000/', // Replace with your client domain
  methods: ['GET', 'POST']
}));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Serve the index.html file on root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server with CORS options
const io = new Server(server, {
  cors: {
    origin: 'https://your-client-domain.vercel.app', // Replace with your client domain
    methods: ['GET', 'POST']
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('Connected.....');
  
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
