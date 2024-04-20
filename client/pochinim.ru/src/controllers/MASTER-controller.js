import {makeAutoObservable} from "mobx"
import masterServices from "../services/master-services";
import masterPhoto from '../img/masterPhoto.png';

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

    async getReviewsById(id){
        
    }

    async getWholeInfById(id){

        const photo = masterPhoto;
        const fio = "Антон Горячев";
        const stars = "4,8";
        const reviewsCount = 297;

        return {"photo": masterPhoto, "fio": "Антон Горячев", "stars": "4,8", "reviewsCount": 297, "aboutMe": "Здравствуйте. Произвожу комплекс работ по сантехнике и электрике. От замены санфаянса, розеток, выключателей до прокладки коммуникаций. Буду рад вам помочь.",
                "experience": null, "education": null };
    }

    async getListOfMasters(from, to){

        const masters = await masterServices.getListOfMasters(from, to);
    
        var fin = [];

        masters.map(async obj => {
            fin.push({
                'id': obj.id,
                'fio': obj.fio,
                'photo': await masterServices.getMasterPhoto(obj.photo_path),
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
        //return masters;
    }

    async getMasterPhotoByPath(path){
        const photo = await masterServices.getMasterPhoto(path);

        return photo;
    }
};

const masterController = new MasterController();

export default masterController;