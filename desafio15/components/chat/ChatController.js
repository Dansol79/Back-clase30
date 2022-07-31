const Message = require('./ChatMongoSchema');

class ChatController {
    constructor() {}

    async listAll(){
        try{
            return await Message.find({});
        }catch(error){
            throw new Error(`Error al listar los mensajes: ${error}`);
        }
    }

    async save(newElement){
        try{
            return await Message.create(newElement);
        }catch(error){
            throw new Error(`Error al guardar el mensaje: ${error}`);
        }

    }

    async listById(id){
        try{
            return await Message.findById(id);
        }catch(error){
            throw new Error(`Error al listar el mensaje: ${error}`);
        }
    }

    async update(id, data){
        try{
            return await Message.findByIdAndUpdate(id, data);
        }catch(error){
            throw new Error(`Error al actualizar el mensaje: ${error}`);
        }
    }

    async delete(id){
        try{
            return await Message.findByIdAndDelete(id);
        }catch(error){
            throw new Error(`Error al eliminar el mensaje: ${error}`);
        }
    }

};

const chatController = new ChatController();

module.exports = chatController;