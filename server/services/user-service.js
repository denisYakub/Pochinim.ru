const pool = require('../database');
const crypto = require('crypto-js')
const EmailService = require('../services/email-service');
const TokenService = require('../services/token-service');
const ApiError = require('../exeptions/api-error');
const jose = require('jose')

class UserService{
    async registration(email, login, password){
        try {
            const candidat = await pool.query(`SELECT COUNT(*) FROM accounts WHERE account_email = '${email}'`)
            if(candidat.rows[0].count > 0) {
                throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существуе!`);
            }

            const hashPassword = await crypto.MD5(password)

            const user = await pool.query(`INSERT INTO Accounts (account_email, account_name, account_password) 
                                            VALUES ('${email}', '${login}', '${hashPassword}')`);

            const tokens = await TokenService.generateToken(login);

            const account_id = await pool.query(`SELECT id_account FROM accounts WHERE account_email = '${email}'`);

            await TokenService.saveToken(account_id.rows[0].id_account, (await tokens.refreshToken));

            const account_id_on_return = account_id.rows[0].id_account;

            return {
                "refreshToken": (await tokens.refreshToken), 
                "accessToken": (await tokens.accessToken),
                "account_id": account_id_on_return, 
                "email":email
            }
        } catch (error) {
            throw error;
        }
    }

    async logIn(login, password){
        try {
            const candidat = await pool.query(`SELECT account_password FROM accounts WHERE account_name = '${login}'`)
            if(candidat.rows[0] === undefined) {
                throw ApiError.BadRequest(`Пользователь с логином ${login} не найден!`);
            }
    
            const isPasswordsEquals = (await crypto.MD5(password) == candidat.rows[0].account_password);
            if(!isPasswordsEquals){
                throw ApiError.BadRequest(`Неверный пароль!`);
            }
    
            const tokens = await TokenService.generateToken(login);
    
            const account_id = await pool.query(`SELECT id_account FROM accounts WHERE account_name = '${login}'`);
    
            await TokenService.saveToken(account_id.rows[0].id_account, (await tokens.refreshToken));
    
            const account_id_on_return = account_id.rows[0].id_account;
    
            return {
                "refreshToken": (await tokens.refreshToken), 
                "accessToken": (await tokens.accessToken),
                "account_id": account_id_on_return, 
                "login": login
            }
        } catch (error) {
            throw error;
        }
    }

    async logOut(refreshToken){
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken){
        try {
            if(!refreshToken){
                throw ApiError.UnAuthorizedError();
            }
    
            await TokenService.validateRefreshToken(refreshToken).catch(reas =>{
                throw ApiError.UnAuthorizedError("validateRefreshToken");
            })
            
    
            const tokenFromBD = await TokenService.findToken(refreshToken);
    
            if(!tokenFromBD){
                throw ApiError.UnAuthorizedError();
            }
    
            const account_id = await pool.query(`SELECT id_account FROM accounts_tokens WHERE token = '${refreshToken}'`);
            const login = await pool.query(`SELECT account_name FROM accounts WHERE id_account = '${account_id.rows[0].id_account}'`);
    
            const tokens = await TokenService.generateToken(login.rows[0].account_name);
    
            await TokenService.saveToken(account_id.rows[0].id_account, (await tokens.refreshToken));
    
            const account_id_on_return = account_id.rows[0].id_account;
            const account_name_on_return = login.rows[0].account_name;
    
            return {
                "refreshToken": (await tokens.refreshToken), 
                "accessToken": (await tokens.accessToken),
                "account_id": account_id_on_return,
                "login": account_name_on_return
            }
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers(){
        const users = await pool.query("SELECT * FROM accounts");

        return users.rows;
    }

}

module.exports = new UserService();