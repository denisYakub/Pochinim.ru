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
            var d = {"success": true};

            for (let i = 0; i < req.files.length; i++) {
                const file_path = req.files[i].path;

                const data = await topicService.saveNewFileForTopic(id_topic, file_path);
                
                if(!data){
                    d.success = false;
                }
            }
        
            return res.json((await d));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TopicController();