let socket 

let user;

let chatBox = document.getElementById('chatbox');

Swal.fire({
    title: 'Autenticacion',
    input: 'text',
    text: 'Introduce un nombre para poder acceder al chat',
    inputValidator: value => !value.trim() && 'Porfavor escribe un usuario para continuar',
    allowOutsideClick: false,
}).then(result => {
    user = result.value
    socket = io()
    document.getElementById('username').innerHTML = user;

    chatBox.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user: user,
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
})

    socket.on('messagesLogs', data => {
        const messagesLogs = document.getElementById('messagesLogs')
        let messages = ''
        data.forEach(msg => {            
            messages += `<div class="container-messages_user"><p>${msg.user}</p><span>${msg.message}</span></div>`
        });
        messagesLogs.innerHTML = messages;
    })
})