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

        if(!ret.message){
            localStorage.setItem('token', ret.accessToken);
            localStorage.setItem('mail', email);
            localStorage.setItem('id', ret.account_id);
            return true;
        }

        return false;
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
        
        if(!ret.message){
            localStorage.setItem('token', ret?.accessToken);
            localStorage.setItem('mail', email);
            localStorage.setItem('id', ret?.account_id);
            return true;
        }
        
        return false;
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
            
            console.log(ret?.accessToken);

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

    async getUserInfo(id_user, secondCall = true){
        var data = await fetch(`http://localhost:4000/api/users/${id_user}`, {
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
            data = await userController.getUserInfo(id_user, false);
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

    async saveUserPhoto(photo){
        const file = new FormData();
        file.append('userPhoto', photo);
        const result = await fetch(`http://localhost:4000/api/users/${localStorage.getItem('mail')}`, {
            method: 'PUT',
            body: file
        })

        return result;
    }
    
    async getUserPhoto(path){
        const data = await fetch(`http://localhost:4000/api/photos`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ path: path })
        })

        const photo = await data.blob();

        const obj = URL.createObjectURL(photo);

        return obj;
    }
}

const userController = new UserController();

export default userController;