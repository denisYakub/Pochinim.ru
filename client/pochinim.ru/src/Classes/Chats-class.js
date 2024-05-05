class Chat{
    #id_companion
    #chats
    constructor(){
        this.#id_companion = null;
        this.#chats = [];
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
}

const chat = new Chat();

export default chat;