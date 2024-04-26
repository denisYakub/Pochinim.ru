import userServices from "../services/delete/user-services";
import fetchServices from "../services/fetch-services";

class UserController{

    async checkUserEmailInBd(email){
        //const ret = await userServices.checkEmail(email)
        const ret = await fetchServices.fetchGETWithCredentials(`/users/check_email/${email}`);
        return ret;
    }

    async registrate(email, login, password){
        //var ret = await userServices.registrate(name, email, password);
        const body = {"login": login, "password": password, "email": email};

        var ret = await fetchServices.fetchPOSTWithCredentials(`/users`, JSON.stringify(body));

        localStorage.setItem('token', ret.accessToken);
        localStorage.setItem('mail', email);

        if(ret?.message){
            return false;
        }
        return true;
    }

    async getSendCode(email){
        //var code = await userServices.sendCode(email);
        var code = await fetchServices.fetchGET(`/users/send_code/${email}`);

        if(code?.message){
            return false;
        }
        
        return code;
    }

    async logInUser(email, password){
        //var ret = await userServices.logIn(email, password);
        const body = {'email': email, 'password': password};

        const ret = await fetchServices.fetchPOSTWithCredentials('/users/login', JSON.stringify(body));
        
        localStorage.setItem('token', ret?.accessToken);
        localStorage.setItem('mail', email);
        console.log(ret);
        if(ret?.message){
            return false;
        }
        return true;
    }

    async checkForAccess(){
        if(localStorage.getItem('token')){
            //const ret = await userServices.checkAuth();
            const ret = await fetchServices.fetchGETWithCredentials(`/refresh`);
            //denisyakubov321@gmail.com
            localStorage.setItem('token', ret.accessToken);

            if(ret?.message){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    async logOutUser(){
        //const ret = await userServices.logOut();
        const ret = await fetchServices.fetchGETWithCredentials(`/users/logout`);

        localStorage.removeItem('token');
        localStorage.removeItem('mail');

        if(ret?.message){
            return false;
        }
        return true;
    }

    async getUserInfo(email){
        //const ret = await userServices.getUserInfo(email);
        const ret = await fetchServices.fetchGETWithCredentialsAndAuthorization(`/users/${email}`, localStorage.getItem('token'));

        return ret;
    }

    async updateUserField(field, newValue, id_account){
        console.log(field + ' will be now: ' + newValue);
        const body = {'column_name': field, 'new_value': newValue, 'id_account': id_account};

        const ret = fetchServices.fetchPUTWithCredentialsAndAuthorization('/users', body, localStorage.getItem('token'));
 
        return ret;
    }

    async getUserTopics(email){
        //const ret = await topicServices.getAllUserTopics(email);
        const ret = await fetchServices.fetchGETWithCredentialsAndAuthorization(`/topics/${email}`, localStorage.getItem('token'));
        console.log(ret);
        return ret;
    }
}

const userController = new UserController();

export default userController;