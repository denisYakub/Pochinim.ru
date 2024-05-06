const chatService = require("../services/chat-service");
const userService = require("../services/user-service");
const userController = require("./user-controller");

class ChatController{
    /*async sendMessageUser(req, res, next){
        try {
            const {email_sender, id_companion, message_text, id_topic} = req.body;
            
            const result = await chatService.sendMessage(email_sender, id_companion, message_text, id_topic, 'user');

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async getMessagesUser(req, res, next){
        try {
            const sender_email = req.params.id_sender;
            const id_topic = req.params.id_topic;
            const id_companion = req.params.id_companion;

            const result = await chatService.getAllMessagesFromChat(sender_email, id_companion, id_topic, 'user');
            
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }*/
    async getChat(req, res, next){
        try {

            const { id_user, id_master, id_topic } = req.body;
            
            const idUser = await userService.getUserIdByMail(id_user);

            const result = await chatService.getChatID(idUser, id_master, id_topic);

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async getChatsUser(req, res, next){
        try {
            const sender_email = req.params.id_sender;
            const id_topic = req.params.id_topic;
            
            const result = await chatService.getUserChatsByIdTopic(sender_email, id_topic);
            
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async getMessages(req, res, next){
        try {
            const id_chat = req.params.id_chat;

            const result = await chatService.getMessagesByIdChat(id_chat);

            return res.json(result)
        } catch (error) {
            next(error);
        }
    }
    async sendMessage(req, res, next){
        try {
            const id_chat = req.params.id_chat;

            const {text, sender_email} = req.body;

            const result = await chatService.sendMessageByIdChat(id_chat, text, sender_email);

            return res.json(result)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ChatController();