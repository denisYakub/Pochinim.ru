class MasterServices{
    /*async registrate(fio, occupation, workingFrom, location, selectedOptionsLocation, 
        email, password, city){
        try {
            const body = {"fio": fio, "occupation": occupation, "workingFrom": workingFrom, "location": location,
                            "selectedOptionsLocation": selectedOptionsLocation, "email": email, "password": password, "city": city};
                            
            const data = await fetch("http://localhost:4000/api/master",{
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
    }*/

    /*async setMasterPhoto(id_master, photo){
        try {
            if(id_master){
                const file = new FormData();
                file.append('masterPhoto', photo);

                await fetch(`http://localhost:4000/api/masters/${id_master}`,{
                    method: "PUT",
                    body: file
                });
            }
        } catch (error) {
            console.log('Error in setMasterPhoto:', error);
        }
    }*/

    /*async getListOfMasters(from, to){
        try {
            const dataMasters = await fetch(`http://localhost:4000/api/masters/${from}/${to}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const bot = await dataMasters.json();

            return bot;
        } catch (error) {
            console.log("Error in getListOfMasters:", error);
        }
    }*/
    
    /*async getMasterInfo(id){
        try {
            const data = await fetch(`http://localhost:4000/api/masters/${id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log("Error in getMasterInfo:", error);
        }
    }*/
}

const masterServices = new MasterServices();

export default masterServices;