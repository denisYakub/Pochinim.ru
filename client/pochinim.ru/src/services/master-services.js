class MasterServices{
    async registrate(fio, occupation, workingFrom, location, selectedOptionsLocation, 
        email, password, city){
        try {
            const body = {"fio": fio, "occupation": occupation, "workingFrom": workingFrom, "location": location,
                            "selectedOptionsLocation": selectedOptionsLocation, "email": email, "password": password, "city": city};
            const data = await fetch("http://localhost:4000/api/registrateMaster",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            
            const bot = await data.json();

            return bot?.id_master;
        } catch (error) {
            console.log('Error in registrate: ', error);
        }
    }

    async setMasterPhoto(id_master, photo){
        try {
            if(id_master){
                const file = new FormData();
                file.append('masterPhoto', photo);

                await fetch(`http://localhost:4000/api/saveMasterPhoto/${id_master}`,{
                    method: "PUT",
                    body: file
                });
            }
        } catch (error) {
            console.log('Error in setMasterPhoto:', error);
        }
    }

    async getListOfMasters(from, to){
        try {
            const body = { "from": from, "to": to };

            const dataMasters = await fetch('http://localhost:4000/api/listOfMasterAndReviews', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const bot = await dataMasters.json();

            return bot;
        } catch (error) {
            console.log("Error in getListOfMasters:", error);
        }
    }

    async getMasterPhoto(path){
        try { 
            const body = { "path": path };

            const data = await fetch(`http://localhost:4000/api/getSinglePhoto`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const bot = await data.blob();

            const url = URL.createObjectURL(bot);

            return url;
        } catch (error) {
            console.log("Error in getMasterPhoto:", error);
        }
    }
}

const masterServices = new MasterServices();

export default masterServices;