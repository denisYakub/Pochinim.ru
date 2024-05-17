import {makeAutoObservable} from "mobx"
import chatController from "./Chat-controller";
import topicController from "./TOPIC-controller";
class MasterController{
    constructor(){
        makeAutoObservable(this);
    }

    async checkMasterInBd(email){
        const data = await fetch(`http://localhost:4000/api/masters/check_email/${email}`,{
            credentials: 'include',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return (await data.json());
    }

    async registrate(fio, occupation, workingFrom, location, selectedOptionsLocation, 
                        email, photo, password, city){

        var selectedOptionsLocationStr = [];
        
        if (selectedOptionsLocation != null) {
            for (const obj of selectedOptionsLocation){
                selectedOptionsLocationStr.push(obj.label)
            }
        }

        const body = {"fio": fio, "occupation": occupation, "workingFrom": workingFrom, "location": location,
                        "selectedOptionsLocation": JSON.stringify(selectedOptionsLocationStr).replace('[', '').replace(']', ''),
                            "email": email, "password": password, "city": city};

        const data = await fetch(`http://localhost:4000/api/masters`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },  
            credentials: 'include',
            body: JSON.stringify(body)
        });
            
        const master = await data.json();

        localStorage.setItem('token-master', master?.accessToken);
        localStorage.setItem('mail-master', master?.email);
        localStorage.setItem('id-master', master?.id_master);

        const file = new FormData();
        file.append('masterPhoto', photo);

        const ret = await fetch(`http://localhost:4000/api/masters/${master?.id_master}`,{
            method: "PUT",
            body: file
        });
          
        if(master?.message || (await ret.json())?.message){
            return false;
        }  
        return true;
    }

    async logInMaster(email, password){
        const body = {'email': email, 'password': password};

        const data = await fetch(`http://localhost:4000/api/masters/login`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            credentials: 'include',
            body: JSON.stringify(body)
        });
        
        const ret = await data.json();

        localStorage.setItem('token-master', ret?.accessToken);
        localStorage.setItem('mail-master', email);
        localStorage.setItem('mail-master', ret?.id_master);

        if(ret?.message){
            return false;
        }
        return true;
    }

    async logOutMaster(){
        const data = await fetch(`http://localhost:4000/api/masters/logout`,{
            credentials: 'include',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const ret = await data.json();

        localStorage.removeItem('token-master');
        localStorage.removeItem('mail-master');

        if(ret?.message){
            return false;
        }
        return true;
    }

    async refreshMasterTokens(){
        if(localStorage.getItem('token-master')){
            const data = await fetch(`http://localhost:4000/api/refresh-master`,{
                credentials: 'include',
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const ret = await data.json();

            localStorage.setItem('token-master', ret?.accessToken);

            if(ret?.message){
                return false;
            }else{
                return true;
            }
        }

        return false;
    }

    async getReviewsById(id){
        
    }

    async getWholeInfById(id){
        const data = await fetch(`http://localhost:4000/api/masters/${id}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return (await data.json());
    }

    async getListOfMasters(from, to){
        const data = await fetch(`http://localhost:4000/api/masters/${from}/${to}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const masters = await data.json();
        
        return masters;
    }

    async getMasterPhotoByPath(path){
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

    async updateMasterField(field, new_value, id_master){

        const body = {field: field, new_value: new_value, id_master: id_master};

        const result = await fetch(`http://localhost:4000/api/masters`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token-master')}`
            },
            body: JSON.stringify(body)
        })

        return result;
    }

    async getMastersTopicsAndChats(id_master){
        const chats = await chatController.getChatsMaster(id_master);
        
        var result = [];

        for(const chat of chats){
            result.push({order: (await topicController.getTopicById(chat.id_topic)), chat: chat})
        }

        return result;
    }

    async getMastersPhotoById(id_master){
        const data = await fetch(`http://localhost:4000/api/photos/masters/${id_master}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        });

        const photo = await data.blob();

        const obj = URL.createObjectURL(photo);

        return obj;
    }
};

const masterController = new MasterController();

export default masterController;