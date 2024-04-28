import { json } from "react-router-dom";

class UserController{

    async checkUserEmailInBd(email){
        const data = await fetch(`http://localhost:4000/api/users/check_email/${email}`,{
            credentials: 'include',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return (await data.json());
    }

    async registrate(email, login, password){
        const body = {"login": login, "password": password, "email": email};

        const data = await fetch(`http://localhost:4000/api/users`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            credentials: 'include',
            body: JSON.stringify(body)
        });

        const ret = await data.json();

        localStorage.setItem('token', ret.accessToken);
        localStorage.setItem('mail', email);

        if(ret?.message){
            return false;
        }
        return true;
    }

    async getSendCode(email){
        const data = await fetch(`http://localhost:4000/api/users/send_code/${email}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const code = await data.json();

        if(code?.message){
            return false;
        }
        
        return code;
    }

    async logInUser(email, password){
        const body = {'email': email, 'password': password};

        const data = await fetch(`http://localhost:4000/api/users/login`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            credentials: 'include',
            body: JSON.stringify(body)
        });

        const ret = await data.json();

        localStorage.setItem('token', ret?.accessToken);
        localStorage.setItem('mail', email);
        
        if(ret?.message){
            return false;
        }
        return true;
    }

    async refreshUserTokens(){
        if(localStorage.getItem('token')){
            const data = await fetch(`http://localhost:4000/api/refresh`,{
                credentials: 'include',
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const ret = await data.json();
            
            localStorage.setItem('token', ret?.accessToken);

            if(ret?.message){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    async logOutUser(){
        const data = await fetch(`http://localhost:4000/api/users/logout`,{
            credentials: 'include',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const ret = await data.json();

        localStorage.removeItem('token');
        localStorage.removeItem('mail');

        if(ret?.message){
            return false;
        }
        return true;
    }

    async getUserInfo(email, secondCall = true){
        var data = await fetch(`http://localhost:4000/api/users/${email}`, {
            credentials: "include",
            method: "GET", 
            headers : {
                "Accept": "application/json",                    
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if(data.status == 401 && secondCall){
            await userController.refreshUserTokens();
            data = await userController.getUserInfo(email, false);
        }

        if(secondCall){
            return data.json();
        }
        return data;
    }

    async updateUserField(field, newValue, id_account, secondCall = true){
        const body = {'column_name': field, 'new_value': newValue, 'id_account': id_account};

        var data = await fetch(`http://localhost:4000/api/users`,{
            credentials: "include",
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });
        
        if(data.status == 401 && secondCall){
            await userController.refreshUserTokens();
            data = await userController.updateUserField(field, newValue, id_account, false);
        }

        return (await data.json());
    }

    async getUserTopics(email, secondCall = true){
        var data = await fetch(`http://localhost:4000/api/topics/${email}`, {
            credentials: "include",
            method: "GET", 
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if(data.status == 401 && secondCall){
            await userController.refreshUserTokens();
            data = await userController.getUserTopics(email, false);
        }

        if(secondCall){
            return data.json();
        }
        return data;

    }
}

const userController = new UserController();

export default userController;