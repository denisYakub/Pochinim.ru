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

    async getListOfMasters1(){

        const masters = await masterServices.getListOfMasters(0, 30);
    
        return masters;
    }

    async getListOfMasters(){
        const master = {fio: 'Антон Горячев',
                        photo: masterPhoto,
                        stars: '4,8',
                        reviewsCount: 297,
                        aboutMe: "Здравствуйте. Произвожу комплекс работ по сантехнике и электрике. От замены санфаянса, розеток, выключателей до прокладки коммуникаций. Буду рад вам помочь.",
                        experience: ["с 1999 г. (25 лет)"],
                        education: ["РосТех строй"],
                        sercicesAndPrice: [["Сантехнические работы", '2500 ₽/точка'], 
                                            ["Аварийные сантехники", '1500 ₽/усл.'],
                                            ["Замена смесителя", '700 ₽/шт.']],
                        review: {stars: '5',
                                        date: '13 декабря 2023',
                                        from: 'Владислав',
                                        topic: 'Сантехника',
                                        text: 'Все хорошо и без лишних вопрос сделал задачу о которой мы договорились',
                                        price: '3000 ₽'}
                        };
        const master228 = {fio: 'Антон Горячев',
                        photo: masterPhoto,
                        stars: '4,8',
                        reviewsCount: 297,
                        aboutMe: "Здравствуйте. Произвожу комплекс работ по сантехнике и электрике. От замены санфаянса, розеток, выключателей до прокладки коммуникаций. Буду рад вам помочь.",
                        experience: ["с 1999 г. (25 лет)"],
                        education: ["РосТех строй"],
                        sercicesAndPrice: [["жопа", '2500 ₽/точка']],
                        review: {stars: '5',
                                        date: '13 декабря 2023',
                                        from: 'Владислав',
                                        topic: 'Сантехника',
                                        text: 'Все хорошо и без лишних вопрос сделал задачу о которой мы договорились',
                                        price: '3000 ₽'}
                        };
        var masters = [];
    
        masters.push(master228);
    
        for (let index = 0; index < 30; index++) {
            masters.push(master);
        }
    
        return masters;
    }
};

const masterController = new MasterController();

export default masterController;