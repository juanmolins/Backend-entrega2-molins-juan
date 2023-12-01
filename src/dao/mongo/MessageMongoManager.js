import Message from "./models/messagesModel.js"


class MessageMongoManager {
    constructor(io){
        this.io = io
    }

    async getAllMessagesChat () {
        try{

        
        const messages = await Message.find();
        return messages
        } catch (error) {
            console.error(`Error al obtener todos los mensajes ${error}`)   
            throw error
        }

    }

    async addNewMessage (user, message) {
        try {
            const newMessage = new Message({user, message})
            const saveMessage = await newMessage.save();
            return saveMessage;
        } catch(error){
            console.error(`Error al guardar el mensaje ${error}`)
            throw error;
        }

    }

}


export {MessageMongoManager as MessageMongoManager};