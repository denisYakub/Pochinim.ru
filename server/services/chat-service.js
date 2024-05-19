const pool = require('../database');
const masterService = require('./master-service');
const userService = require('./user-service');
class ChatService{
    async getChatID(id_user, id_master, id_topic, message_text){
        try {
            const chat_exists = (await pool.query(`SELECT COUNT(*) FROM chats
                                WHERE id_user = '${id_user}' AND id_master = '${id_master}' AND id_topic = '${id_topic}'`)).rows[0].count;

            var id_chat;
            
            if(chat_exists == 1){
                id_chat = (await pool.query(`SELECT id_chat FROM chats
                            WHERE id_user = '${id_user}' AND id_master = '${id_master}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;
            }else{
                id_chat = this.createChat(id_user, id_master, message_text, id_topic)
            }
            
            return id_chat;
        } catch (error) {
            throw error;
        }
    }
    async createChat(id_account, id_master, message_text, id_topic){
        try {
            const today = new Date();

            await pool.query(`INSERT INTO chats 
                                (text_of_last_message, id_user, id_master, date, id_topic, status) 
                                        VALUES 
                                ('${message_text}', '${id_account}', '${id_master}', 
                                '${today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()}', '${id_topic}', 'свободно')`);

            return (await pool.query(`SELECT id_chat FROM chats 
                        WHERE id_user = '${id_account}' AND id_master = '${id_master}' AND id_topic = '${id_topic}'`)).rows[0].id_chat;
        } catch (error) {
            throw error;
        }
    };
    async getUserChatsByIdTopic(sender_email, id_topic){
        try {
            const id_user = await userService.getUserIdByMail(sender_email);

            return(await pool.query(`SELECT * FROM chats WHERE id_user = '${id_user}' AND id_topic = '${id_topic}'`)).rows;                 
        } catch (error) {
            throw error;
        }
    }
    async getMessagesByIdChat(id_chat){
        try {
            
            return (await pool.query(`SELECT * from messages WHERE id_chat = ${id_chat}`)).rows;

        } catch (error) {
            throw error;
        }
    }
    async sendMessageByIdChat(id_chat, text, sender_email){
        try {
            
            await pool.query(`INSERT INTO messages 
                                (id_chat, sender_email, message)
                                    VALUES
                                (${id_chat}, '${sender_email}', '${text}')`);

            await pool.query(`UPDATE chats SET 
                                text_of_last_message = '${text}' WHERE id_chat = '${id_chat}'`)

            return;
        } catch (error) {
            throw error;
        }
    }
    async getChatByIdMaster(id_master){
        try {
            return (await pool.query(`SELECT * FROM chats WHERE id_master = ${id_master}`)).rows;
        } catch (error) {
            throw error;
        }
    }
    async deteChatsWithIdTopic(id_topic){
        try {

            const id_chats = (await pool.query(`SELECT id_chat FROM chats
                                                WHERE id_topic = ${id_topic}`)).rows;

            for(const id_chat of id_chats){
                await pool.query(`DELETE FROM messages
                                    WHERE id_chat = ${id_chat.id_chat}`)

                await pool.query(`DELETE FROM chats
                                    WHERE id_chat = ${id_chat.id_chat}`)
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
    async deleteChatsExeptOneByIdMasterAndChangeStatus(id_topic, id_master, status){
        try {

            const id_chats = (await pool.query(`SELECT id_chat FROM chats
                                                            WHERE id_topic = ${id_topic} AND id_master != ${id_master}`)).rows;

            console.log(id_chats);
            
            for(const id_chat of id_chats){
                await pool.query(`DELETE FROM messages
                                         WHERE id_chat = ${id_chat.id_chat}`);
                                                
                await pool.query(`DELETE FROM chats
                                    WHERE id_chat = ${id_chat.id_chat}`);
                }
            
            await pool.query(`UPDATE chats
                                SET status = '${status}'
                                    WHERE id_topic = ${id_topic} AND id_master = ${id_master}`);
            
            return true;
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