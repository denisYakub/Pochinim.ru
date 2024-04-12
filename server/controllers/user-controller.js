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
            const {email} = req.body;
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

    async logOut(req, res, next){
        try {
            const refreshToken = await req.headers.cookie;
            const tokenRf = refreshToken.split("=")[1];

            const token = await userService.logOut(tokenRf);
            res.clearCookie('refreshToken');

            return res.json((await token));
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next){
        try {

        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try {
            const refreshToken = await req.headers.cookie;
            const token = refreshToken.split("=")[1];
            
            const userData = await UserService.refresh(token);
            
            res.cookie('refreshToken', (await userData).refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json((await userData));
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next){
        try {
            const users = await UserService.getAllUsers();

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async sendActivationMail(req, res, next){
        try {
            const {email} = req.body;
            const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; 

            await emailService.sendActivationEmail(email, code);

            return res.json(code);

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();