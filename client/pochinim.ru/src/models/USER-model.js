export default class User{
    #SERVER_LOCATION="http://localhost:4000/api";
    isAuth = false;

    async registrate(login, email, photo, password){
        try {
            
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
            localStorage.setItem('token', bot.refreshToken)
            console.log(bot);
            this.isAuth = true;
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
            console.log(bot);
            localStorage.setItem('token', bot.accessToken)
            this.isAuth = true;
            
            return bot;
        } catch (error) {
            console.log("Error in checkAuth:", error);
        }
    }
}