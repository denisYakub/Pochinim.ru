const pool = require("../database");
const topicService = require("../services/topic-service");

class TopicController{
    async createTopic(req, res, next){
        try {
            console.log(req.body);
            const {topicName, fio, phoneNumber,
            need, problem, problemLocation,
            address, date, payment, priceStart, priceEnd,
            detailsTxt, 
            mail} = req.body;

            console.log(priceStart, priceEnd);

            const data = topicService.createNewTopic(topicName, fio, phoneNumber,
                                                            need, problem, problemLocation,
                                                            address, date, payment, priceStart, priceEnd, 
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
        
            return res.json(d);
        } catch (error) {
            next(error);
        }
    }
    async getAllUsersTopics(req, res, next){
        try {   
            const email = req.params.email;

            const data = await topicService.getListOfTopicsByEmail(email);

            return res.json(data);
        } catch (error) {
            next(e);
        }
    }
}

module.exports = new TopicController();