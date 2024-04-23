const { count } = require("console");
const masterService = require("../services/master-service");
const photoService = require("../services/photo-service");
const reviewService = require("../services/review-service");
const fs = require('fs');
class MasterController{
    async registration(req, res, next){
        try {
            const {fio, occupation, workingFrom, 
                    location, selectedOptionsLocation, 
                    email, password, city} = req.body;

            const data = await masterService.registrateNewMaster(fio, occupation, workingFrom, 
                                                            location, selectedOptionsLocation, 
                                                                email, password, city);

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }
    
    async setMasterPhoto(req, res, next){
        try {
            const id_master = req.params.id_master;
            const file_path = req.file.path;

            const data = await masterService.saveMasterPhoto(id_master, file_path);

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }

    async getListOfMastersAndReviews(req, res, next){
        try {
            const {from, to} = req.body;

            const data_masters = await masterService.getListOfMasters(from, to);
            
            var data = [];

            for (const data_master of data_masters){
                const reviewsStat = await reviewService.countStat();

                data.push({
                    'id': data_master.id_master,
                    'fio': data_master.fio,
                    'photo_path': data_master.master_photo_path,
                    'stars': reviewsStat.total_star,
                    'reviewsCount': reviewsStat.count,
                    'aboutMe': data_master.about_me,
                    'experience': data_master.experience,
                    'education': data_master.education,
                    'sercicesAndPrice': data_master.sercices_price,
                    'city': data_master.city,
                    'reviews': await reviewService.getAllReviewsByRecipientId(data_master.id_master),
                });
            }
            
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getMasterFullInfo(req, res, next){
        try {
            const master_id = req.params.id;

            const data = await masterService.getMasterInfo(master_id);

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MasterController();