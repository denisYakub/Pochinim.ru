const masterService = require("../services/master-service");
const reviewService = require("../services/review-service");

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

            var data= [];

            data_masters.map(async (v, i) => {
                v["reviews"] = await reviewService.getAllReviewsByRecipientId(v.id_master);
                data.push(v);
            });

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MasterController();