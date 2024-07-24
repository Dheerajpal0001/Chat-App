const socket = io()

let user;

let textarea = document.querySelector("#textarea");

let createMessage = document.querySelector(".messages");

do{
    user = prompt("Enter your name");
}while(!user)




textarea.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value);
    }
})



const sendMessage = (msg)=>{
    let obj = {
        username: user,
        message: msg,
    }

    // append
    appendMessage(obj, 'sending')
    textarea.value = ' '


    // Send to server

    socket.emit('message', obj)
}




const appendMessage = (obj, type)=>{
    let sendDiv = document.createElement('div');
    let className = type;
    sendDiv.classList.add(className, 'mess')

    let details = `
        <h4>${obj.username}</h4>
        <p>${obj.message}</p>
    `

    sendDiv.innerHTML = details;

    createMessage.appendChild(sendDiv);
}


// Recieve Message

socket.on('message',(msg)=>{
    // console.log(msg);
    appendMessage(msg, 'recieving');
})
