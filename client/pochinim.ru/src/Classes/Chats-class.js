import chatController from "../controllers/Chat-controller";

class Chat{
    #id_companion
    #id_chat
    #chats
    #messages
    #id_topic
    constructor(){
        this.#id_companion = null;
        this.#chats = [];
        this.#id_chat = null;
        this.#messages = [];
        this.#id_topic = null;
    }

    async setChatIDByIdTopic(id_topic){
        if( id_topic != null && this.#id_companion != null){
            this.#id_chat = await chatController.getChatID(localStorage.getItem('mail'), this.#id_companion, id_topic);
        }
    }

    async downloadChatsOfTopic(id_topic){
        this.#chats = await chatController.getChatsUserByIdTopic(id_topic);
    }

    async downloadMessagesOfChat(){
        if(this.#id_chat != null)
            this.#messages = await chatController.getMessages(this.#id_chat);
    }

    async sendMessage(text){
        if(text != '' && this.#id_chat != null){
            await chatController.sendMessage(text, this.#id_chat);
        }
    } 

    get idCompanion(){
        return this.#id_companion;
    }
    set idCompanion(new_id_companion){
        if(new_id_companion != null){
            this.#id_companion = new_id_companion;
        }
    }
    get chats(){
        return this.#chats;
    }
    get idChat(){
        return this.#id_chat;
    }
    set idChat(new_id_chat){
        if(new_id_chat != null){
            this.#id_chat = new_id_chat;
        }
    }
    get messages(){
        return this.#messages;
    }
    get idTopic(){
        return this.#id_topic;
    }
    set idTopic(new_id_topic){
        if(new_id_topic != null){
            this.#id_topic = new_id_topic;
        }
    }
}

const chat = new Chat();

export default chat;