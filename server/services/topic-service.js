const pool = require('../database');
class TopicService{
    async createNewTopic(topicName, fio, phoneNumber, need, problem, problemLocation,
                            address, date, payment, detailsTxt, detailsFiles, mail){
        try {
            const topic = await pool.query(``);
            
            return {"result": true};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TopicService();