const pool = require('../database');
const crypto = require('crypto-js')
const TokenService = require('../services/token-service');
const ApiError = require('../exeptions/api-error');
const jose = require('jose')

class UserService{
    async registration(email, login, password){
        try {
            const candidat = await pool.query(`SELECT COUNT(*) FROM accounts WHERE account_email = '${email}'`);

            if(candidat.rows[0].count > 0) {
                throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существуе!`);
            };

            const hashPassword = await crypto.MD5(password);

            await pool.query(`INSERT INTO Accounts (account_email, account_name, account_password) 
                                            VALUES ('${email}', '${login}', '${hashPassword}')`);

            const tokens = await TokenService.generateToken(email);

            const account_id = await pool.query(`SELECT id_account FROM accounts WHERE account_email = '${email}'`);

            await TokenService.saveToken(account_id.rows[0].id_account, (await tokens.refreshToken));

            const account_id_on_return = account_id.rows[0].id_account;

            return {
                "refreshToken": (await tokens.refreshToken), 
                "accessToken": (await tokens.accessToken),
                "account_id": account_id_on_return, 
                "email":email
            };
        } catch (error) {
            throw error;
        }
    }

    async checkEmail(email){
        try {
            const candidat = await pool.query(`SELECT COUNT(*) FROM accounts WHERE account_email = '${email}'`)
            
            if(candidat.rows[0].count == 0){
                return false;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async logIn(email, password){
        try {
            const candidat = await pool.query(`SELECT account_password FROM accounts WHERE account_email = '${email}'`)
            if(candidat.rows[0] === undefined) {
                throw ApiError.BadRequest(`Пользователь с почтой ${email} не найден!`);
            }
    
            const isPasswordsEquals = (await crypto.MD5(password) == candidat.rows[0].account_password);
            if(!isPasswordsEquals){
                throw ApiError.BadRequest(`Неверный пароль!`);
            }

            const account_id = await pool.query(`SELECT id_account FROM accounts WHERE account_email = '${email}'`);
            const login = await pool.query(`SELECT account_name FROM accounts WHERE account_email = '${email}'`);

            const tokens = await TokenService.generateToken(email);
    
            await TokenService.saveToken(account_id.rows[0].id_account, (await tokens.refreshToken));
    
            const account_id_on_return = account_id.rows[0].id_account;
    
            return {
                "refreshToken": (await tokens.refreshToken), 
                "accessToken": (await tokens.accessToken),
                "account_id": account_id_on_return, 
                "login": login
            };
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
            
            const account_id_on_return = await account_id.rows[0].id_account;
            
            const email = await pool.query(`SELECT account_email, account_name FROM accounts WHERE id_account = '${account_id_on_return}'`);
            
            const account_name_on_return = email.rows[0].account_name;

            const tokens = await TokenService.generateToken(email.rows[0].account_email);
    
            await TokenService.saveToken(account_id.rows[0].id_account, (await tokens.refreshToken));
    
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
    async getFullUserInfo(email){
        try {
            const user = await pool.query(`SELECT accounts.id_account, account_name, account_email, photo_path, registration_date, 
                                                    gender, phone_number, notification_option, socials, passport_verification
                                            FROM accounts LEFT JOIN accounts_additional_information
                                            ON accounts.id_account = accounts_additional_information.id_account
                                            WHERE account_email = '${email}'`)

            return user.rows[0];
        } catch (error) {
            throw error;
        }
    }
    async updateColumn(column_name, new_value, id_account){
        try {
            var ret;
            
            if(['account_name', 'account_password', 'account_email'].includes(column_name)){
                ret = await pool.query(`UPDATE accounts
                                        SET ${column_name} = '${new_value}'
                                        WHERE id_account = '${id_account}'`);

            }else if(['photo_path', 'gender', 'phone_number', 'notification_option', 'socials', 'passport_verification'].includes(column_name)){
                const nothingToUpdate = (await pool.query(`SELECT COUNT(*) FROM accounts_additional_information
                                                            WHERE id_account = '${id_account}'`)).rows[0].count
                if(nothingToUpdate == 0){
                    ret = await pool.query(`INSERT INTO accounts_additional_information 
                                                (id_account, ${column_name}) 
                                                    VALUES 
                                                ('${id_account}', '${new_value}')`)
                }else{
                    ret = await pool.query(`UPDATE accounts_additional_information
                                                SET ${column_name} = '${new_value}'
                                                    WHERE id_account = '${id_account}'`);
                }
            }else{
                throw ApiError.BadRequest('tabels dont have this column: ', column_name);
            }

            return ret;
        } catch (error) {
            throw error;
        }
    }
    async getUserIdByMail(email){
        try {
            return (await pool.query(`SELECT id_account FROM accounts
                        WHERE account_email = '${email}'`)).rows[0].id_account;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();

/*CREATE TABLE IF NOT EXISTS public.accounts
(
    id_account integer NOT NULL DEFAULT 'nextval('accounts_id_account_seq'::regclass)',
    account_name character varying(50) COLLATE pg_catalog."default",
    account_password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    account_email character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT accounts_pkey PRIMARY KEY (id_account),
    CONSTRAINT accounts_account_name_key UNIQUE (account_name)
)
CREATE TABLE IF NOT EXISTS public.accounts_additional_information
(
    id_account integer NOT NULL,
    photo_path character varying(200) COLLATE pg_catalog."default",
    registration_date date,
    gender character varying(50) COLLATE pg_catalog."default",
    phone_number character varying(100) COLLATE pg_catalog."default",
    notification_option integer,
    socials character varying(200)[] COLLATE pg_catalog."default",
    CONSTRAINT accounts_additional_information_pkey PRIMARY KEY (id_account),
    CONSTRAINT accounts_additional_information_id_account_fkey FOREIGN KEY (id_account)
        REFERENCES public.accounts (id_account) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
*/