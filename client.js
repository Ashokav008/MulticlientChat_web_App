const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messegeInp = document.getElementById('messegeInp')
const messegecontainer = document.querySelector(".container")
var audio1 = new Audio('ting.mp3');


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messegecontainer.append(messageElement);
    if (position == 'left') {
        audio1.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You:${message}`, 'right')
    socket.emit('send', message)
    messageInp.value = ''

})

const name1 = prompt("Enter ur name to join");
socket.emit('new-user-joined', name1)
socket.on('user-joined', name1 => {
    append(`${name1} joined the chat`, 'left')
})
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
})
socket.on('left', name => {
    append(`${name}:left the chat`, 'left')
});