class FetchServices{
    async fetchPOST(destination, body){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, 
                body: body
            });
            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }
    async fetchPOSTWithCredentials(destination, body){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, 
                credentials: 'include',
                body: body
            });
            const bot = await data.json();
            
            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchPOSTWithCredentialsAndAuthorization(destination, body, token){
        try {
            const dataTopic = await fetch(`http://localhost:4000/api${destination}`, {
                credentials: "include",
                method: "POST", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: body
            })

            const bot = await dataTopic.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchGET(destination){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            console.log(data);
            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchGETWithCredentials(destination){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                credentials: 'include',
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchGETBlob(destination){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })

            const bot = await data.blob();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchGETWithCredentialsAndAuthorization(destination, token){
        try {
            const dataTopic = await fetch(`http://localhost:4000/api${destination}`, {
                credentials: "include",
                method: "GET", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if(dataTopic.status == 401){
                return { 'need_to_refresh': true };
            }

            const bot = await dataTopic.json();
            
            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchPUT(destination, body){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }

    async fetchPUTWithCredentialsAndAuthorization(destination, body, token){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                credentials: "include",
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }
    
    async fetchPUTFiles(destination, body){
        try {
            const data = await fetch(`http://localhost:4000/api${destination}`,{
                method: "PUT",
                body: body
            });

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log(`Error in ${destination}:`, error);
        }
    }
}

const fetchServices = new FetchServices();

export default fetchServices;