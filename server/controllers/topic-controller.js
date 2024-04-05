const pool = require("../database");
const topicService = require("../services/topic-service");

class TopicController{
    async createTopic(req, res, next){
        try {
            const {topicName, fio, phoneNumber,
            need, problem, problemLocation,
            address, date, payment, 
            detailsTxt, 
            mail} = req.body;

            const data = topicService.createNewTopic(topicName, fio, phoneNumber,
                                                            need, problem, problemLocation,
                                                            address, date, payment, 
                                                            detailsTxt, mail);

            return res.json((await data));
        } catch (error) {
            next(error);
        }
    }

    async saveFileForTopic(req, res, next){
        try {
            const id_topic = req.params.id_topic;
            const file_path = req.file.path;

            const data = topicService.saveNewFileForTopic(id_topic, file_path);
            
            return res.json((await data));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TopicController();