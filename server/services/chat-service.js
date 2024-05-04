const pool = require('../database');
const masterService = require('./master-service');
const userService = require('./user-service');
class ChatService{
    async sendMessage(email_sender, id_companion, message_text, id_topic, sender_role){
        try {
            var chat_exists;
            var id_sender;
            var id_chat;
            
            if(sender_role == 'user'){
                id_sender = await userService.getUserIdByMail(email_sender);

                chat_exists = (await pool.query(`SELECT COUNT(*) FROM chats
                                WHERE id_user = '${id_sender}' AND id_master = '${id_companion}' AND id_topic = '${id_topic}'`)).rows[0].count;

                if(chat_exists == 0){
                    id_chat = await this.createChat(id_sender, id_companion, message_text, id_topic);
                }else{
                    id_chat = (await pool.query(`SELECT id_chat FROM chats
                                    WHERE id_user = '${id_sender}' AND id_master = '${id_companion}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;

                    await pool.query(`UPDATE chats SET text_of_last_message = '${message_text}' WHERE id_chat = '${id_chat}'`)
                }   
            }else{
                id_sender = await masterService.getMasterIdByMail(email_sender);

                chat_exists = (await pool.query(`SELECT COUNT(*) FROM chats
                                WHERE id_user = '${id_companion}' AND id_master = '${id_sender}' AND id_topic = '${id_topic}'`)).rows[0].count;

                if(chat_exists == 0){
                    id_chat = await this.createChat(id_companion, id_sender, message_text, id_topic);
                }else{
                    id_chat = (await pool.query(`SELECT id_chat FROM chats
                                    WHERE id_user = '${id_companion}' AND id_master = '${id_sender}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;

                    await pool.query(`UPDATE chats SET text_of_last_message = '${message_text}' WHERE id_chat = '${id_chat}'`)
                }
            }

            await pool.query(`INSERT INTO messages
                                (id_chat, sender_email, message)
                                    VALUES
                                ('${id_chat}', '${email_sender}', '${message_text}')`);

            return;
        } catch (error) {
            throw error;
        }
    }
    async createChat(id_account, id_master, message_text, id_topic){
        try {
            const today = new Date();

            await pool.query(`INSERT INTO chats 
                                (text_of_last_message, id_user, id_master, date, id_topic) 
                                        VALUES 
                                ('${message_text}', '${id_account}', '${id_master}', 
                                '${today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()}', '${id_topic}')`);

            return (await pool.query(`SELECT id_chat FROM chats 
                        WHERE id_user = '${id_account}' AND id_master = '${id_master}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;
        } catch (error) {
            throw error;
        }
    };
    async getAllMessagesFromChat(sender_email, id_companion, id_topic, sender_role){
        try {
            var id_chat;
            var id_sender;

            if(sender_role == 'user'){
                id_sender = await userService.getUserIdByMail(sender_email);
                id_chat = (await pool.query(`SELECT id_chat FROM chats
                            WHERE id_user = '${id_sender}' AND id_master = '${id_companion}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;
            }else{
                id_sender = await masterService.getMasterIdByMail(sender_email);
                id_chat = (await pool.query(`SELECT id_chat FROM chats
                            WHERE id_user = '${id_companion}' AND id_master = '${id_sender}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;
            }

            return (await pool.query(`SELECT * FROM messages WHERE id_chat = '${id_chat}'`)).rows;

        } catch (error) {
            throw error;
        }
    }
    async getUserChatsByIdTopic(sender_email, id_topic){
        try {
            const id_user = await userService.getUserIdByMail(sender_email);

            return (await pool.query(`SELECT * FROM chats WHERE id_user = '${id_user}' AND id_topic = '${id_topic}'`)).rows;            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ChatService();
/*CREATE TABLE IF NOT EXISTS public.chats
(
    id_chat integer NOT NULL DEFAULT 'nextval('chats_id_chat_seq'::regclass)',
    text_of_last_message character varying(500) COLLATE pg_catalog."default" NOT NULL,
    id_user integer NOT NULL,
    id_master integer NOT NULL,
    date date NOT NULL,
    id_topic integer NOT NULL,
    CONSTRAINT chats_pkey PRIMARY KEY (id_chat),
    CONSTRAINT chats_id_master_fkey FOREIGN KEY (id_master)
        REFERENCES public.masters (id_master) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT chats_id_topic_fkey FOREIGN KEY (id_topic)
        REFERENCES public.topics (id_topic) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT chats_id_user_fkey FOREIGN KEY (id_user)
        REFERENCES public.accounts (id_account) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.messages
(
    id_message integer NOT NULL,
    id_chat integer NOT NULL,
    sender_email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    message character varying(500) COLLATE pg_catalog."default",
    id_file integer,
    CONSTRAINT messages_pkey PRIMARY KEY (id_message),
    CONSTRAINT messages_id_chat_fkey FOREIGN KEY (id_chat)
        REFERENCES public.chats (id_chat) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT messages_id_file_fkey FOREIGN KEY (id_file)
        REFERENCES public.files (id_file) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
*/