export default class User{
    #SERVER_LOCATION="http://localhost:4000/api";

    async registrate(login, email, photo, password){
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
            localStorage.setItem('token', bot.accessToken)
            return bot;
        } catch (error) {
            console.log("Error in registration:", error);
        }
    };

    async logIn(login, password){
        try {
            const body = {"login": login, "password": password};
            
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
            console.log(localStorage.getItem('token'));
            return bot;
        } catch (error) {
            console.log("Error in logIn:", error);
        }
    }

    async logOut(){
        try {
            
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
}