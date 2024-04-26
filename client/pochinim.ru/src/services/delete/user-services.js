class UserServices{
    /*async registrate(login, email, password){
        try {
            const body = {"login": login, "password": password, "email": email};
            const data = await fetch("http://localhost:4000/api/users",{
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

            return bot;
        } catch (error) {
            console.log("Error in registration:", error);
        }
    }*/
    
    /*async checkEmail(email){
        try {
            const data = await fetch(`http://localhost:4000/api/users/check_email/${email}`,{
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"},
                credentials: 'include'
            })

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log("Error in checkEmail:", error);
        }
    }*/

    /*async sendCode(email){
        try {
            const data = await fetch(`http://localhost:4000/api/users/send_code/${email}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}
            });

            const bot = await data.json();
            return bot;
        } catch (error) {
            console.log("Error in sendCode:", error);
        }
    }*/

    /*async logIn(email, password){
        try {
            const body = {"email": email, "password": password};
            
            const data = await fetch("http://localhost:4000/api/users/login",{
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

            return bot;
        } catch (error) {
            console.log("Error in logIn:", error);
        }
    }*/

    /*async logOut(){
        try {
            const data = await fetch("http://localhost:4000/api/users/logout",{
                credentials: "include",
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}, 
            })
            const bot = await data.json();

            localStorage.removeItem('token');
            localStorage.removeItem('mail');

            return bot;
        } catch (error) {
            console.log("Error in logOut:", error);
        }
    }*/
    
    /*async checkAuth(){
        try {
            const data = await fetch("http://localhost:4000/api/users/refresh",{
                credentials: "include",
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"}, 
            });
            const bot = await data.json();

            localStorage.setItem('token', bot.accessToken);

            return bot;
        } catch (error) {
            console.log("Error in checkAuth:", error);
        }
    }*/

    /*async getUserInfo(email){
        try {
            const data = await fetch(`http://localhost:4000/api/users/${email}`,{
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            const bot = await data.json();
            
            return bot;
        } catch (error) {
            console.log("Error in getUserInfo:", error);
        }
    }*/
};

const userServices = new UserServices()

export default userServices;