const pool = require('../database');
class ChatService{
    async createChat(id_account, id_master){
        
    };
}

module.exports = new ChatService();

/*CREATE TABLE IF NOT EXISTS public.chats
(
    id_chat integer NOT NULL,
    id_account integer NOT NULL,
    id_master integer NOT NULL,
    CONSTRAINT chats_pkey PRIMARY KEY (id_chat)
)
CREATE TABLE IF NOT EXISTS public.messages
(
    id_message integer NOT NULL,
    text character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    "from" character varying(1) COLLATE pg_catalog."default" NOT NULL,
    id_chat integer NOT NULL,
    CONSTRAINT message_pkey PRIMARY KEY (id_message),
    CONSTRAINT messages_id_chat_fkey FOREIGN KEY (id_chat)
        REFERENCES public.chats (id_chat) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)*/