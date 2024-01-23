const pool = require('../database');
const jose = require('jose')
const crypto = require('crypto-js')

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
                await pool.query(`INSERT INTO accounts_tokens (id_account, token) 
                                VALUES (${account_id}, '${refreshToken}')`);
            }

            return refreshToken;

    }

    async removeToken(refreshToken){
        const tokenData = await pool.query(`DELETE FROM accounts_tokens WHERE token = '${refreshToken}'`);

        return tokenData;
    }

    validateAccessToken(token){
        try {
            const secretKeyAccess = crypto.SHA256(process.env.JWT_ACCESS_SECRET);
            const userData = jose.jwtVerify(token, Uint8Array.of(secretKeyAccess.words));

            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const secretKeyRefresh = crypto.SHA256(process.env.JWT_REFRESH_SECRET);
            const userData = jose.jwtVerify(token, Uint8Array.of(secretKeyRefresh.words));

            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(token){
        const tokenData = await pool.query(`SELECT COUNT(*) FROM accounts_tokens WHERE token = '${token}'`);
        
        return tokenData.rows[0].count;
    }

}

module.exports = new TokenService();