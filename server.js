const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

