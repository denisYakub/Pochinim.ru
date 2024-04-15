const pool = require('../database');
class TopicService{
    async createNewTopic(topicName, fio, phoneNumber, need, problem, problemLocation,
                            address, date, payment, detailsTxt, mail){
        try {

            const accountId = await pool.query(`SELECT id_account FROM accounts
                                                    WHERE account_email = '${mail}'`);

            await pool.query(`INSERT INTO topics (FIO, phone_number, need, problem,
                                                problem_location, address, details, id_payment, 
                                                id_account, topic_name, date) 
                                            VALUES('${fio}', '${phoneNumber}', '${need}', '${problem}',
                                                '${problemLocation}', '${address}', '${detailsTxt}', 
                                                ${payment}, ${accountId.rows[0].id_account}, 
                                                '${topicName}', '${date}')`);
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
}

module.exports = new TopicService();