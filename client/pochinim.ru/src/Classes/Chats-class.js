import chatController from "../controllers/Chat-controller";

class Chat{
    #id_companion
    #id_chat
    #chats
    #messages
    #id_topic
    #id_user

    #companion_info;

    constructor(){
        this.#id_companion = null;
        this.#id_user = null;
        this.#chats = [];
        this.#id_chat = null;
        this.#messages = [];
        this.#id_topic = null;
        this.#companion_info = {};
    }

    async setChatIDByIdTopic(id_topic){
        if( id_topic != null && this.#id_companion != null){
            this.#id_chat = await chatController.getChatID(localStorage.getItem('id'), this.#id_companion, id_topic);
        }
    }

    async downloadChatsOfTopic(id_topic, email){
        if(email == localStorage.getItem('mail')){
            const respond = await chatController.getChatsUserByIdTopic(id_topic);
            if(!respond.status){
                this.#chats = respond;
            }else if(respond.status == 303){
                console.log('copy');
            }else{
                throw new Error('Говнокод')
            }
        }else{
            const respond = await chatController.getChatsMaster(localStorage.getItem('id-master'));
            if(!respond.status){
                this.#chats = respond;
            }else if(respond.status == 303){
                console.log('copy');
            }else{
                throw new Error('Говнокод')
            }
        }
    }

    async downloadMessagesOfChat(){
        if(this.#id_chat != null){
            const respond = await chatController.getMessages(this.#id_chat);
            if(!respond.status){
                this.#messages = respond;
            }else if(respond.status == 303){
                console.log('copy');
            }else{
                throw new Error('Говнокод')
            }
        }
    }

    async sendMessage(text, sender_email){
        if(text != '' && this.#id_chat != null){
            await chatController.sendMessage(text, this.#id_chat, sender_email);
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

    set companionInfo(new_companion_info){
        this.#companion_info = new_companion_info;
    }

    get companionInfo(){
        return this.#companion_info;
    }

    set userId(new_id_user){
        this.#id_user = new_id_user;
    }

    get userId(){
        return this.#id_user;
    }
}

const chat = new Chat();

export default chat;