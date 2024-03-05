const topicService = require("../services/topic-service");

class TopicController{
    async createTopic(req, res, next){
        try {
            const {topicName, fio, phoneNumber,
            need, problem, problemLocation,
            address, date, payment, 
            detailsTxt, detailsFiles, 
            mail} = req.body;

            const topicData = topicService.createNewTopic(topicName, fio, phoneNumber,
                                                            need, problem, problemLocation,
                                                            address, date, payment, 
                                                            detailsTxt, detailsFiles, 
                                                            mail);

            return res.json((await topicData));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TopicController();