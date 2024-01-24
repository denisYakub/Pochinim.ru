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
        .setExpirationTime('30s')
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
                await pool.query(`INSERT INTO accounts_tokens (id_account, token) 
                                VALUES (${account_id}, '${refreshToken}')`);
            }

            return refreshToken;

    }

    async removeToken(refreshToken){
        const tokenData = await pool.query(`DELETE FROM accounts_tokens WHERE token = '${refreshToken}'`);

        return tokenData;
    }

    /*validateAccessToken(token){
        let data = {data: " "};
        
        try {
            const secretKeyAccess = crypto.SHA256(process.env.JWT_ACCESS_SECRET);
            jose.jwtVerify(token, Uint8Array.of(secretKeyAccess.words))
            .catch((err) => {
                console.log(err.code);
                data = err.code;
           });
            return data;
        } catch (error) {
            return null;
        }
    }*/

    /*validateRefreshToken(token){
        try {
            const secretKeyRefresh = crypto.SHA256(process.env.JWT_REFRESH_SECRET);
            let data = " "
            jose.jwtVerify(token, Uint8Array.of(secretKeyRefresh.words))
            .catch((err) => {
                console.log(err);
            });
            
            return data;
        } catch (e) {
            return null;
        }
    }*/

    async findToken(token){
        const tokenData = await pool.query(`SELECT COUNT(*) FROM accounts_tokens WHERE token = '${token}'`);
        
        return tokenData.rows[0].count;
    }

}

module.exports = new TokenService();