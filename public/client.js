
const socket = io(`https://dancing-medovik-dff34e.netlify.app/`);

let user;
let textarea = document.querySelector("#textarea");
let createMessage = document.querySelector(".messages");

do {
  user = prompt("Enter your name");
} while (!user);

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
  }
});

const sendMessage = (msg) => {
  let obj = {
    username: user,
    message: msg,
  };

  // Append message
  appendMessage(obj, 'sending');
  textarea.value = '';

  // Send to server
  socket.emit('message', obj);
};

const appendMessage = (obj, type) => {
  let sendDiv = document.createElement('div');
  let className = type;
  sendDiv.classList.add(className, 'mess');

  let details = `
    <h4>${obj.username}</h4>
    <p>${obj.message}</p>
  `;

  sendDiv.innerHTML = details;
  createMessage.appendChild(sendDiv);
};

// Receive message
socket.on('message', (msg) => {
  appendMessage(msg, 'receiving');
});