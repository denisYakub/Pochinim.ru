const ApiError = require('../exeptions/api-error');
const tokenService = require('../services/token-service');
const userService = require('../services/user-service');
const UserService = require('../services/user-service');
const {validationResult} = require('express-validator')

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

    async logIn(req, res, next){
        try {
            const {login, password} = req.body;
            const userData = await UserService.logIn(login, password);

            res.cookie('refreshToken', (await userData).refreshToken, 
                        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json((await userData));
        } catch (e) {
            next(e);
        }
    }

    async logOut(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logOut(refreshToken);
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
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);

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
}

module.exports = new UserController();