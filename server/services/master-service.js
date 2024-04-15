const pool = require('../database');

class MasterService{
    async registrateNewMaster(fio, occupation, workingFrom, 
                                location, selectedOptionsLocation, email, password){
        try {
            
            await pool.query(`INSERT INTO masters (master_email, master_password, 
                                                    fio, occupation, working_from,
                                                    location, selected_options_of_location) 
                                            VALUES('${email}', '${password}', 
                                                    '${fio}','${occupation}','${workingFrom}',
                                                    '${location}', '${selectedOptionsLocation}')`);

            const id_master = await pool.query(`SELECT id_master FROM masters WHERE master_email = '${email}'`);
            
            return {"result": true,
                    "id_master": id_master.rows[0].id_master};
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
}

module.exports = new MasterService();

/*
    CREATE TABLE IF NOT EXISTS public.masters
(
    id_master integer NOT NULL DEFAULT 'nextval('masters_id_master_seq'::regclass)',
    master_email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    master_password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    fio character varying(200) COLLATE pg_catalog."default" NOT NULL,
    occupation character varying(50) COLLATE pg_catalog."default" NOT NULL,
    working_from integer NOT NULL,
    location character varying(200) COLLATE pg_catalog."default",
    selected_options_of_location character varying(900) COLLATE pg_catalog."default",
    master_photo_path character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT masters_pkey PRIMARY KEY (id_master)
)
*/