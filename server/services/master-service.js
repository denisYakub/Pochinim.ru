const pool = require('../database');
const crypto = require('crypto-js')
const TokenService = require('../services/token-service');
const ApiError = require('../exeptions/api-error');

class MasterService{
    async registrateNewMaster(fio, occupation, workingFrom, 
                                location, selectedOptionsLocation, email, password, city){
        try {
            const candidat = await pool.query(`SELECT COUNT(*) FROM masters WHERE master_email = '${email}'`);

            if(candidat.rows[0].count > 0) {
                throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существуе!`);
            };

            const hashPassword = await crypto.MD5(password);

            await pool.query(`INSERT INTO masters (master_email, master_password, 
                                                    fio, occupation, working_from,
                                                    location, selected_options_of_location, city) 
                                            VALUES('${email}', '${hashPassword}', 
                                                    '${fio}','${occupation}','${workingFrom}',
                                                    '${location}', '{${selectedOptionsLocation}}', '${city}')`);

            const tokens = await TokenService.generateToken(email);

            const id_master = await pool.query(`SELECT id_master FROM masters WHERE master_email = '${email}'`);
            
            await TokenService.saveToken(await id_master.rows[0].id_master, (await tokens.refreshToken), 'master');

            return {"result": true,
                    "id_master": id_master.rows[0].id_master,
                    "email": email,
                    "refreshToken": (await tokens.refreshToken), 
                    "accessToken": (await tokens.accessToken)
                };
        } catch (error) {
            throw error
        }
    }
    async saveMasterPhoto(id_master, file_path){
        try {
            
            await pool.query(`UPDATE masters SET master_photo_path = '${file_path}'
                                                WHERE id_master = '${id_master}'`);

            return {"success": true}
        } catch (error) {
            throw error
        }
    }

    async logIn(email, password){
        try {
            const candidat = await pool.query(`SELECT master_password FROM masters WHERE master_email = '${email}'`);

            if(candidat.rows[0] === undefined) {
                throw ApiError.BadRequest(`Пользователь с почтой ${email} не найден!`);
            };
    
            const isPasswordsEquals = (await crypto.MD5(password) == candidat.rows[0].account_password);

            if(!isPasswordsEquals){
                throw ApiError.BadRequest(`Неверный пароль!`);
            }

            const master = await pool.query(`SELECT id_master, fio FROM masters WHERE master_email = '${email}'`);

            const tokens = await TokenService.generateToken(email);
    
            await TokenService.saveToken(master.rows[0].id_master, (await tokens.refreshToken), 'master');
    
            return {
                "refreshToken": (await tokens.refreshToken), 
                "accessToken": (await tokens.accessToken),
                "id_master": master.rows[0].id_master, 
                "login": master.rows[0].fio
            };
        } catch (error) {
            throw error;
        }
    }

    async logOut(refreshToken){
        const token = await TokenService.removeToken(refreshToken, 'master');

        return token;
    }

    async getListOfMasters(from, to){
        try {
            
            const listofMasters = await pool.query(`SELECT masters.id_master AS id_master, fio, occupation, location, master_photo_path, 
                                                    about_me, experience, education, sercices_price, city, documents
                                                        FROM masters INNER JOIN masters_additional_information 
                                                            ON masters.id_master = masters_additional_information.id_master`);
            
            return listofMasters.rows;
        } catch (error) {
            throw error
        }
    }
    async getMasterInfo(id){
        try {
            const listofMasters = await pool.query(`SELECT masters.id_master AS id_master, fio, occupation, location, master_photo_path, 
                                                    about_me, experience, education, sercices_price
                                                        FROM masters LEFT JOIN masters_additional_information 
                                                            ON masters.id_master = masters_additional_information.id_master
                                                                WHERE masters.id_master = '${id}'`);
            return listofMasters.rows[0];
        } catch (error) {
            throw error
        }
    }
    async getMasterIdByMail(email){
        try {
            return (await pool.query(`SELECT id_master FROM masters
                        WHERE master_email = '${email}'`)).rows[0].id_master;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MasterService();

/*CREATE TABLE IF NOT EXISTS public.masters
(
    id_master integer NOT NULL DEFAULT 'nextval('masters_id_master_seq'::regclass)',
    master_email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    master_password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    fio character varying(200) COLLATE pg_catalog."default" NOT NULL,
    occupation character varying(50) COLLATE pg_catalog."default" NOT NULL,
    working_from integer NOT NULL,
    location character varying(200) COLLATE pg_catalog."default",
    master_photo_path character varying(200) COLLATE pg_catalog."default",
    city character varying(100) COLLATE pg_catalog."default" NOT NULL,
    selected_options_of_location character varying(100)[] COLLATE pg_catalog."default",
    CONSTRAINT masters_pkey PRIMARY KEY (id_master)
)
CREATE TABLE IF NOT EXISTS public.masters_additional_information
(
    id_master integer NOT NULL,
    about_me character varying(500) COLLATE pg_catalog."default",
    experience character varying(500)[] COLLATE pg_catalog."default",
    education character varying(500)[] COLLATE pg_catalog."default",
    sercices_price character varying(500)[] COLLATE pg_catalog."default",
    CONSTRAINT masters_additional_information_pkey PRIMARY KEY (id_master),
    CONSTRAINT masters_additional_information_id_master_fkey FOREIGN KEY (id_master)
        REFERENCES public.masters (id_master) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)*/