const jose = require('jose')
const crypto = require('crypto-js')
class Tokens {
    generateToken(payload){
        const secretKey = crypto.SHA256(payload);

        
        const accessToken = new jose.SignJWT({id: process.env.JWT_ACCESS_SECRET})
        .setProtectedHeader({ alg: 'HS256' }) // algorithm
        .setIssuedAt()
        .setExpirationTime('30m')
        .sign(Uint8Array.of(secretKey.words));

        const refreshToken = new jose.SignJWT({id: process.env.JWT_REFRESH_SECRET})
        .setProtectedHeader({ alg: 'HS256' }) // algorithm
        .setIssuedAt()
        .setExpirationTime('30')
        .sign(Uint8Array.of(secretKey.words));
        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(account_id, refreshToken){

        const body = {"account_token": refreshToken, "account_id": account_id};

            const response1 = await fetch("http://localhost:4000/saveToken",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response1);
            if(response1 === "ERROR: account with this token have been created!")
            {
                const response2 = await fetch("http://localhost:4000/updateToken",{
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                console.log(response2);
            }

            return refreshToken;
    }
}

module.exports = new Tokens();