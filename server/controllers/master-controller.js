const { count } = require("console");
const masterService = require("../services/master-service");
const photoService = require("../services/photo-service");
const reviewService = require("../services/review-service");
const fs = require('fs');
const tokenService = require("../services/token-service");
class MasterController{
    async registration(req, res, next){
        try {
            const {fio, occupation, workingFrom, 
                    location, selectedOptionsLocation, 
                    email, password, city} = req.body;

            const data = await masterService.registrateNewMaster(fio, occupation, workingFrom, 
                                                            location, selectedOptionsLocation, 
                                                                email, password, city);
            res.cookie('refreshToken-master', (await data).refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

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
    async login(req, res, next){
        try {
            const {email, password} = await req.body;
            const data = await masterService.logIn(email, password);

            res.cookie('refreshToken-master', data.refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false});

            return res.json((await data));
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next){
        try {
            //const refreshToken = await req.headers.cookie;
            //const tokenRf = refreshToken.split("=")[1];
            const tokens = await req.headers.cookie;
            
            const refreshToken = tokens?.split("; ")[0];
            
            const tokenRf = refreshToken?.split("=")[1];

            const token = await masterService.logOut(tokenRf);
            res.clearCookie('refreshToken-master');

            return res.json((await token));
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try {
            const tokens = await req.headers.cookie;

            var refreshToken = tokens;

            if(tokens.includes('; ')){
                refreshToken = tokens?.split("; ")[0];
            }
            
            const token = refreshToken?.split("=")[1];
            
            const userData = await masterService.refresh(token);
            
            res.cookie('refreshToken-master', (await userData).refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getListOfMastersAndReviews(req, res, next){
        try {
            const from = req.params.from;
            const to = req.params.to;

            const data_masters = await masterService.getListOfMasters(from, to);
            
            var data = [];

            for (const data_master of data_masters){
                const reviewsStat = await reviewService.countMasterStat(data_master.id_master);

                data.push({
                    'id': data_master.id_master,
                    'fio': data_master.fio,
                    'photo_path': data_master.master_photo_path,
                    'stars': reviewsStat.total_star,
                    'reviewsCount': reviewsStat.count,
                    'documents': data_master.documents,
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

            const reviewsStat = await reviewService.countMasterStat(master_id);

            data.stars = reviewsStat.total_star;
            data.reviewsCount = reviewsStat.count;
            data.reviews = await reviewService.getAllReviewsByRecipientId(master_id);

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }

    async checkEmail(req, res, next){
        try {
            const email = req.params.email;
            const userData = await masterService.checkEmail(email);

            return res.json((await userData));

        } catch (e) {
            next(e);
        }
    }

    async updateMasterField(req, res, next){
        try {
            const {field, new_value, id_master} = await req.body;

            const data = await masterService.upDateField(field, new_value, id_master);

            return res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MasterController();