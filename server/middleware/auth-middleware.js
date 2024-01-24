const ApiError = require("../exeptions/api-error");
const tokenService = require("../services/token-service");
const jose = require('jose')
const crypto = require('crypto-js')

module.exports = function (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnAuthorizedError('authorizationHeader'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnAuthorizedError("accessToken"));
        }
        const secretKeyAccess = crypto.SHA256(process.env.JWT_ACCESS_SECRET);
        jose.jwtVerify(accessToken, Uint8Array.of(secretKeyAccess.words))
        .catch((err) => {

            if(err.code == 'ERR_JWT_EXPIRED'){
                return next(ApiError.UnAuthorizedError('jwtVerify'));
            }
        });
        next();
    } catch (e) {
        return next(ApiError.UnAuthorizedError());
    }
}