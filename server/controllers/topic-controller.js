const pool = require("../database");
const chatService = require("../services/chat-service");
const reviewService = require("../services/review-service");
const topicService = require("../services/topic-service");
const chatController = require("./chat-controller");

class TopicController{
    async createTopic(req, res, next){
        try {
            const {topicName, fio, phoneNumber,
            need, problem, problemLocation,
            address, date, payment, priceStart, priceEnd,
            detailsTxt, 
            mail} = req.body;

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
            next(error);
        }
    }

    async getPathsOfTopicImgs(req, res, next){
        try {
            const id_topic = req.params.id_topic;
            
            const data = await topicService.getPathsOfTopicFiles(id_topic);

            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getAllTopics(req, res, next){
        try {
            const topics = await topicService.getTopicsAvailable();

            var data = [];

            for(const val of topics){
                
                const paths = await topicService.getPathsOfTopicFiles(val.id_topic);

                val.photo_paths = paths;

                data.push(val);
            }

            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getTopicById(req, res, next){
        try {
            const id_topic = req.params.id_topic;

            const result = await topicService.getListOfTopicsByTopicId(id_topic);

            const paths = await topicService.getPathsOfTopicFiles(id_topic);

            result.photo_paths = paths;

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async closeTopic(req, res, next){
        try {
            
            const id_topic = req.params.id_topic;

            const result = await topicService.upDateTopicStatus(id_topic, 'отменен');

            if(result){
                const result_2 = await chatService.deteChatsWithIdTopic(id_topic);
            }

        } catch (error) {
            next(error);
        }
    }

    async finalizeTopic(req, res, next){
        try {

            const id_topic = req.params.id_topic;

            const { stars, head, comment, finalPrice, idMaster, idClient } = req.body;

            const result = await topicService.upDateTopicStatus(id_topic, 'завершен');

            if(result){
                const result_2 = await chatService.deleteChatsExeptOneByIdMasterAndChangeStatus(id_topic, idMaster, 'завершен');

                if(result_2){
                    await reviewService.leaveReview(id_topic, stars, head, comment, finalPrice, idMaster, idClient);
                }
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TopicController();