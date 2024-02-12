module.exports = class ApiError extends Error{
    status;
    errors;
    constructor(status, message, errors = []){
        super(message)
        this.status = status;
        this.errors = errors;
    }

    static UnAuthorizedError(message = ''){
        return new ApiError(401, 'Пользователь не авторизован! ' + message);
    }

    static BadRequest(message, errors = []){
        return new ApiError(400, message, errors);
    }

    static NoRecipientsDef(message, errors = []){
        return new ApiError(402, message, errors);
    }

}