const masterService = require("../services/master-service");

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

    async getListOfMasters(req, res, next){
        try {
            const from = req.params.from;
            const to = req.params.to;

            const data = await masterService.getListOfMastersWithReviews(from, to);

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MasterController();