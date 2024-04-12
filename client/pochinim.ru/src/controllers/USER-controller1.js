import userServices from "../services/user-services";

class UserController{

    async checkUserEmail(email){
        const ret = await userServices.checkEmail(email)
        return ret;
    }

    async registrate(email, name, password){
        var ret = await userServices.registrate(name, email, password);
        if(ret?.message){
            return false;
        }
        return true;
    }

    async getSendCode(email){
        var code = await userServices.sendCode(email);
        if(code?.message){
            return false;
        }
        console.log(code);
        return code;
    }

    async logInUser(email, password){
        var ret = await userServices.logIn(email, password);
        console.log(ret);
        if(ret?.message){
            return false;
        }
        return true;
    }

    async checkForAccess(){
        if(localStorage.getItem('token')){
            const ret = await userServices.checkAuth();
            
            if(ret?.message){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    async logOutUser(){
        const ret = await userServices.logOut();
        console.log(ret);

    }
}

const userController = new UserController();

export default userController;