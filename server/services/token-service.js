const pool = require('../database');
const jose = require('jose')
const crypto = require('crypto-js')
const ApiError = require("../exeptions/api-error");

class TokenService{
    async generateToken(payload){

        const secretKeyAccess = crypto.SHA256(process.env.JWT_ACCESS_SECRET);
        const secretKeyRefresh = crypto.SHA256(process.env.JWT_REFRESH_SECRET);

        const accessToken = new jose.SignJWT({id: payload})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30m')
        .sign(Uint8Array.of(secretKeyAccess.words));

        const refreshToken = new jose.SignJWT({id: payload})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(Uint8Array.of(secretKeyRefresh.words));

        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(account_id, refreshToken){

            const tokenData = await pool.query(`SELECT Count(*) FROM accounts_tokens 
                                                WHERE id_account = ${account_id}`)
            if(tokenData.rows[0].count > 0){
                await pool.query(`UPDATE accounts_tokens SET token = '${refreshToken}' 
                                    WHERE id_account = ${account_id}`)
            }else{
                console.log(refreshToken);
                console.log(account_id);
                await pool.query(`INSERT INTO accounts_tokens (id_account, token) 
                                VALUES (${account_id}, '${refreshToken}')`);
            }

            return refreshToken;

    }

    async removeToken(refreshToken){
        const tokenData = await pool.query(`DELETE FROM accounts_tokens WHERE token = '${refreshToken}'`);

        return tokenData;
    }

    async validateAccessToken(token){
        const secretKeyAccess = crypto.SHA256(process.env.JWT_ACCESS_SECRET);
        return new Promise((resolve, reject) => {
            jose.jwtVerify(token, Uint8Array.of(secretKeyAccess.words))
            .then(claims => {
                resolve(claims.payload);
              })
              .catch(err => {
                console.log(`could not verify jwt ${err}`);
                reject('invalid token');
              })
        })
    }

    async validateRefreshToken(token){
        const secretKeyRefresh = crypto.SHA256(process.env.JWT_REFRESH_SECRET);
        return new Promise((resolve, reject) => {
            jose.jwtVerify(token, Uint8Array.of(secretKeyRefresh.words))
            .then(claims => {
                resolve(claims.payload);
              })
              .catch(err => {
                console.log(`could not verify jwt ${err}`);
                reject('invalid token');
              })
        })
    }

    async findToken(token){
        const tokenData = await pool.query(`SELECT COUNT(*) FROM accounts_tokens WHERE token = '${token}'`);
        
        return tokenData.rows[0].count;
    }

}

module.exports = new TokenService();

/*CREATE TABLE IF NOT EXISTS public.accounts_tokens
(
    id integer NOT NULL DEFAULT 'nextval('accounts_tokens_id_seq'::regclass)',
    id_account integer,
    token character varying(1000) COLLATE pg_catalog."default",
    r_token character varying(1000) COLLATE pg_catalog."default",
    CONSTRAINT accounts_tokens_pkey PRIMARY KEY (id),
    CONSTRAINT accounts_tokens_token_key UNIQUE (token),
    CONSTRAINT accounts_tokens_id_account_fkey FOREIGN KEY (id_account)
        REFERENCES public.accounts (id_account) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)*/