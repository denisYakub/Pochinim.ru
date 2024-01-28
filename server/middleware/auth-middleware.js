const ApiError = require("../exeptions/api-error");
const tokenService = require("../services/token-service");
const jose = require('jose')
const crypto = require('crypto-js')

module.exports = async function (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnAuthorizedError('authorizationHeader'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnAuthorizedError("accessToken"));
        }
        
        await tokenService.validateAccessToken(accessToken).catch(reas =>{
            throw next(ApiError.UnAuthorizedError("validateAccessToken"));
        })
        
        next();
    } catch (e) {
        return next(e);
    }
}