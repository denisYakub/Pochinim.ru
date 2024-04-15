import {makeAutoObservable} from "mobx"
import masterServices from "../services/master-services";

class MasterController{
    constructor(){
        makeAutoObservable(this);
    }

    async checkMasterInBd(email){
        return false;
    }

    async registrate(fio, occupation, workingFrom, location, selectedOptionsLocation, 
                        email, photo, password){

        var selectedOptionsLocationStr = "";

        selectedOptionsLocation.map((v, i) => {
            selectedOptionsLocationStr = selectedOptionsLocationStr + ' ' + v;
        })

        const id_master = await masterServices.registrate(fio, occupation, workingFrom, location, selectedOptionsLocationStr, 
            email, password);
        
        const ret = await masterServices.setMasterPhoto(id_master, photo);
        
        if(id_master?.message || ret?.message){
            return false;
        }  
        return true;
    }

    async getReviewsById(){
        
    }
};

const masterController = new MasterController();

export default masterController;