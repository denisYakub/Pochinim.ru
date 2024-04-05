import {makeAutoObservable} from "mobx"
class User{
    SERVER_LOCATION="http://localhost:4000/api";

    login;
    email;
    photo;
    isAuth;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setEmail(email){
        this.email = email;
    }

    setLogin(login){
        this.login = login;
    }
    
    async registrate(login, email, password){
        try {
            const body = {"login": login, "password": password, "email": email};
            const data = await fetch("http://localhost:4000/api/registration",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}, 
                credentials: 'include',
                body: JSON.stringify(body)
            })
            const bot = await data.json();
            localStorage.setItem('token', bot.accessToken);
            localStorage.setItem('mail', email);

            console.log(bot);

            return bot;
        } catch (error) {
            console.log("Error in registration:", error);
        }
    };

    async checkEmail(email){
        try {
            const body = {"email": email};

            const data = await fetch("http://localhost:4000/api/checkEmail",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify(body)
            })

            const bot = await data.json();
            return bot;

        } catch (error) {
            console.log("Error in checkEmail:", error);
        }
    }

    async sendCode(email){
        try {
            const body = {"email": email};

            const data = await fetch("http://localhost:4000/api/sendActivateCode", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"},
                    body: JSON.stringify(body)
            })

            const bot = await data.json();
            return bot;
        } catch (error) {
            console.log("Error in sendCode:", error);
        }
    }

    async logIn(email, password){
        try {
            const body = {"email": email, "password": password};
            
            const data = await fetch("http://localhost:4000/api/logIn",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}, 
                credentials: 'include',
                body: JSON.stringify(body)
            })
            const bot = await data.json();
            localStorage.setItem('token', bot.accessToken)
            localStorage.setItem('mail', email);
            console.log(localStorage.getItem('token'));
            return bot;
        } catch (error) {
            console.log("Error in logIn:", error);
        }
    }

    async logOut(){
        try {
            const data = await fetch("http://localhost:4000/api/logOut",{
                credentials: "include",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}, 
            })
            const bot = await data.json();
            return bot;
        } catch (error) {
            console.log("Error in logOut:", error);
        }
    }
    
    async checkAuth(){
        try {
            const data = await fetch("http://localhost:4000/api/refresh",{
                credentials: "include",
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}, 
            })
            const bot = await data.json();

            localStorage.setItem('token', bot.accessToken)

            return bot;
        } catch (error) {
            console.log("Error in checkAuth:", error);
        }
    }

    async listOfUsers(){
        try {
            const data = await fetch("http://localhost:4000/api/users", {
                credentials: "include",
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            })

            const bot = await data.json();
            
            return bot;
        } catch (error) {
            console.log("Error in listOfUsers:", error);
        }
    }
}

export default new User();