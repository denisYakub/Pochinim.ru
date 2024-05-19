const pool = require('../database');
class TopicService{
    async createNewTopic(topicName, fio, phoneNumber, need, problem, problemLocation,
                            address, date, payment, priceStart, priceEnd, detailsTxt, mail){
        try {

            const accountId = await pool.query(`SELECT id_account FROM accounts
                                                    WHERE account_email = '${mail}'`);

            await pool.query(`INSERT INTO topics (FIO, phone_number, need, problem,
                                                problem_location, address, details, id_payment, 
                                                id_account, topic_name, date, status, views, price_start_end) 
                                            VALUES('${fio}', '${phoneNumber}', '${need}', '${problem}',
                                                '${problemLocation}', '${address}', '${detailsTxt}', 
                                                ${payment}, ${accountId.rows[0].id_account}, 
                                                '${topicName}', '${date}', 'активен', 0, 
                                                '{${priceStart}, ${priceEnd}}')`);
            const id_topic = await pool.query(`SELECT id_topic FROM topics 
                                                    WHERE phone_number = '${phoneNumber}'
                                                    AND date = '${date}'`);
            return {"result": true,
                    "id_topic": id_topic.rows[0].id_topic};
        } catch (error) {
            throw error;
        }
    }
    async saveNewFileForTopic(id_topic, file_path){
        try {
            await pool.query(`INSERT INTO files (file_url) 
                                    VALUES ('${file_path}')`);
            const id_file = await pool.query(`SELECT id_file FROM files 
                                                WHERE file_url = '${file_path}'`);

            await pool.query(`INSERT INTO topics_files (id_topic, id_file)
                                VALUES(${id_topic}, ${id_file.rows[0].id_file})`);

            return true;
        } catch (error) {
            throw error;
        }
    }

    async getListOfTopicsByEmail(email){
        try {
            const account_id = (await pool.query(`SELECT id_account FROM accounts 
                                                    WHERE account_email = '${email}'`)).rows[0].id_account;

            const topics = await pool.query(`SELECT * 
                                                FROM topics WHERE id_account = '${account_id}'`);

            return topics.rows;
        } catch (error) {
            throw error;
        }
    }

    async getPathsOfTopicFiles(id_topic){
        try {
            const id_files = (await pool.query(`SELECT id_file FROM topics_files 
                                                    WHERE id_topic = ${id_topic}`)).rows

            var paths = [];

            for(const id_file of id_files){

                const path = (await pool.query(`SELECT file_url FROM files 
                                                    WHERE id_file = ${id_file.id_file}`)).rows[0].file_url;
                paths.push(path);                             
            }

            return paths;
        } catch (error) {
            throw error;
        }
    }

    async getTopicsAvailable(){
        try {
            return (await pool.query(`SELECT * FROM topics WHERE status = 'активен'`)).rows
        } catch (error) {
            throw error;
        }
    }

    async getListOfTopicsByTopicId(id_topic){
        try {
            return (await pool.query(`SELECT * FROM topics WHERE id_topic = ${id_topic}`)).rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    async upDateTopicStatus(id_topic, status){
        try {
            
            await pool.query(`UPDATE topics
                                SET status = '${status}'
                                    WHERE id_topic = ${id_topic}`);

            return true;
        } catch (error) {
            throw error
        }
    }
}

module.exports = new TopicService();

/*CREATE TABLE IF NOT EXISTS public.topics
(
    id_topic integer NOT NULL DEFAULT 'nextval('topics_id_topic_seq'::regclass)',
    fio character varying(50) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(25) COLLATE pg_catalog."default" NOT NULL,
    need character varying(100) COLLATE pg_catalog."default" NOT NULL,
    problem character varying(100) COLLATE pg_catalog."default" NOT NULL,
    problem_location character varying(100) COLLATE pg_catalog."default" NOT NULL,
    address character varying(200) COLLATE pg_catalog."default" NOT NULL,
    details character varying(500) COLLATE pg_catalog."default",
    id_payment integer NOT NULL,
    id_account integer NOT NULL,
    topic_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    views integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    price_start_end character varying(100)[] COLLATE pg_catalog."default",
    CONSTRAINT "Topics_pkey" PRIMARY KEY (id_topic),
    CONSTRAINT "Topics_id_account_fkey" FOREIGN KEY (id_account)
        REFERENCES public.accounts (id_account) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Topics_id_payment_fkey" FOREIGN KEY (id_payment)
        REFERENCES public.payment_options (id_payment) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
CREATE TABLE IF NOT EXISTS public.topics_files
(
    id_topic_file integer NOT NULL DEFAULT 'nextval('topics_files_id_topic_file_seq'::regclass)',
    id_topic integer NOT NULL,
    id_file integer NOT NULL,
    CONSTRAINT "Topics_Files_pkey" PRIMARY KEY (id_topic_file),
    CONSTRAINT "Topics_Files_id_file_fkey" FOREIGN KEY (id_file)
        REFERENCES public.files (id_file) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "Topics_Files_id_topic_fkey" FOREIGN KEY (id_topic)
        REFERENCES public.topics (id_topic) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
*/