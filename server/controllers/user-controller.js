const { response } = require('express');
const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/token-service');
const userService = require('../services/user-service');
const UserService = require('../services/user-service');
const {validationResult, cookie} = require('express-validator')
const pool = require('../database');
const TokenService = require('../services/token-service');
const { sendActivationEmail } = require('../services/email-service');
const emailService = require('../services/email-service');
class UserController {
    async registration(req, res, next){
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                next(ApiError.BadRequest("Ошибка при проверке валидации!", errors.array()));
            }
            const {email, login, password} = req.body;

            const userData = UserService.registration(email, login, password);

            res.cookie('refreshToken', (await userData).refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json((await userData));
        } catch (e) {
            next(e);
        }
    }

    async checkEmail(req, res, next){
        try {
            const email = req.params.email;
            const userData = UserService.checkEmail(email);

            return res.json((await userData));

        } catch (e) {
            next(e);
        }
    }

    async logIn(req, res, next){
        try {
            const {email, password} = await req.body;
            const userData = await UserService.logIn(email, password);

            res.cookie('refreshToken', userData.refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false});
            return res.json((await userData));
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next){
        try {

            const tokens = await req.headers.cookie;

            console.log(tokens);

            var refreshToken = tokens;

            if(tokens.includes('; ')){
                const part_1 = tokens?.split("; ")[0]
                const part_2 = tokens?.split("; ")[1]

                if(part_1.includes('refreshToken-master')){
                    refreshToken = part_2;
                }else{
                    refreshToken = part_1;
                }
            }

            console.log(refreshToken);

            const token = refreshToken?.split("=")[1];

            const userData = await userService.logOut(token);
            res.clearCookie('refreshToken');

            return res.json((await userData));
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try {
            const tokens = await req.headers.cookie;
            
            var refreshToken = tokens;

            if(tokens.includes('; ')){
                const part_1 = tokens?.split("; ")[0]
                const part_2 = tokens?.split("; ")[1]

                if(part_1.includes('refreshToken-master')){
                    refreshToken = part_2;
                }else{
                    refreshToken = part_1;
                }
            }
            
            const token = refreshToken?.split("=")[1];
            
            const userData = await UserService.refresh(token);
            
            res.cookie('refreshToken', (await userData).refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async sendActivationMail(req, res, next){
        try {
            const email = req.params.email;
            const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; 
            
            await emailService.sendActivationEmail(email, code);

            return res.json(code);

        } catch (e) {
            next(e);
        }
    }

    async getUserInfo(req, res, next){
        try {
            
            const id_user = req.params.id_user;
            
            const userInfo = await userService.getFullUserInfo(id_user);
            
            return res.json(userInfo);
        } catch (e) {
            next(e);
        }
    }
    async updateUserInfo(req, res, next){
        try {
            const { column_name, new_value, id_account } = req.body;
            
            const ret = await userService.updateColumn(column_name, new_value, id_account)

            return res.json(ret);
        } catch (e) {
            next(e);
        }
    }
    async setUserPhoto(req, res, next){
        try {

            const id_user = req.params.id_user;
            const file_path = req.file.path;

            const idUser = await userService.getUserIdByMail(id_user);

            const result = await userService.updateColumn('photo_path', file_path, idUser);

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();