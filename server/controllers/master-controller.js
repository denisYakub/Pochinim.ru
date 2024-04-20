const masterService = require("../services/master-service");
const photoService = require("../services/photo-service");
const reviewService = require("../services/review-service");
const fs = require('fs');
class MasterController{
    async registration(req, res, next){
        try {
            const {fio, occupation, workingFrom, 
                    location, selectedOptionsLocation, 
                    email, password} = req.body;

            const data = await masterService.registrateNewMaster(fio, occupation, workingFrom, 
                                                            location, selectedOptionsLocation, 
                                                                email, password);

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
            const from = req.params.from;
            const to = req.params.to;

            const data_masters = await masterService.getListOfMasters(from, to);

            var data = [];

            data_masters.map(async obj => {
                data.push( {
                    'id': obj.id_master,
                    'fio': obj.fio,
                    'photo_path': obj.master_photo_path,
                    'stars': '4,8',
                    'reviewsCount': 297,
                    'aboutMe': "Здравствуйте. Произвожу комплекс работ по сантехнике и электрике. От замены санфаянса, розеток, выключателей до прокладки коммуникаций. Буду рад вам помочь.",
                    'experience': ["с 1999 г. (25 лет)"],
                    'education': ["РосТех строй"],
                    'sercicesAndPrice': [["Сантехнические работы", '2500 ₽/точка'], 
                                            ["Аварийные сантехники", '1500 ₽/усл.'],
                                            ["Замена смесителя", '700 ₽/шт.']],
                    'reviews': await reviewService.getAllReviewsByRecipientId(obj.id_master),
                });
            });

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MasterController();