import {makeAutoObservable} from "mobx"
import fetchServices from "../services/fetch-services";

class MasterController{
    constructor(){
        makeAutoObservable(this);
    }

    async checkMasterInBd(email){
        return false;
    }

    async registrate(fio, occupation, workingFrom, location, selectedOptionsLocation, 
                        email, photo, password, city){

        var selectedOptionsLocationStr = [];

        for (const obj of selectedOptionsLocation){
            selectedOptionsLocationStr.push(obj.label)
        }
        
        /*const id_master = await masterServices.registrate(fio, occupation, workingFrom, location, 
            JSON.stringify(selectedOptionsLocationStr).replace('[', '').replace(']', ''), 
            email, password, city);*/

        const body = {"fio": fio, "occupation": occupation, "workingFrom": workingFrom, "location": location,
                        "selectedOptionsLocation": JSON.stringify(selectedOptionsLocationStr).replace('[', '').replace(']', ''),
                            "email": email, "password": password, "city": city};

        const id_master = (await fetchServices.fetchPOSTWithCredentials('/master', JSON.stringify(body))).id_master;
        
        const file = new FormData();
        file.append('masterPhoto', photo);

        const ret = await fetchServices.fetchPUT(`/masters/${id_master}`, file)

        //const ret = await masterServices.setMasterPhoto(id_master, photo);
        
        if(id_master?.message || ret?.message){
            return false;
        }  
        return true;
    }

    async getReviewsById(id){
        
    }

    async getWholeInfById(id){

        //const master = await masterServices.getMasterInfo(id);
        const master = await fetchServices.fetchGET(`/masters/${id}`);
        
        return master;
    }

    async getListOfMasters(from, to){
        //const masters = await masterServices.getListOfMasters(from, to);
        const masters = await fetchServices.fetchGET(`/masters/${from}/${to}`);

        var fin = [];

        masters?.map(obj => {
            fin.push({
                'id': obj.id,
                'fio': obj.fio,
                'photo_path': obj.photo_path,
                'stars': obj.stars,
                'reviewsCount': obj.reviewsCount,
                'aboutMe': obj.aboutMe,
                'experience': obj.experience,
                'education': obj.education,
                'sercicesAndPrice': obj.sercicesAndPrice,
                'reviews': obj.reviews,
            })
        })

        return fin;
    }

    async getMasterPhotoByPath(path){
        //const photo = await imageServices.getImageByPath(path);
        const photo = await fetchServices.fetchGETBlob(`/photos/${path}`);

        const obj = URL.createObjectURL(photo);

        return obj;
    }
};

const masterController = new MasterController();

export default masterController;