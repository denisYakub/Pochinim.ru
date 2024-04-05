import { makeAutoObservable } from "mobx";
import topicServices from "../services/topic-services";
import masterPhoto from '../img/masterPhoto.png';
class TopicController{

    constructor(){
        makeAutoObservable(this)
    }

    async createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
        address, date, paymentOption, detailsText, detailsFiles}){

        const mail = localStorage.getItem("mail");

        const id_topic = await topicServices.createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
            address, date, paymentOption, detailsText, detailsFiles, mail})
        
        topicServices.addFilesToTopic(id_topic, detailsFiles);
    }

    async getListOfExistingTopics(){
        const options = ["Сантехник ремонт", "Сантехник ремонт стояка",
                            "Сантехник онлайн", "Сантехник эксперт", 
                            "Сантехник срочно"];
        return options;
    }
    
    async getListOfWork(){
        const options = ["Срочная помощь при аварии", "Прочистка канализации",
                            "Устранение течи", "Ремонт сантехники", 
                            "Установка или замена сантехники", "Демонтаж сантехники",
                            "Дистанционная консульация сантехника"];
        return options;
    }
    
    async getListOfWhatHappend(){
        const options = ["Течь", "Засор", "Ржавчина"];
        return options;
    }
    
    async getListofWhereIsProblem(){
        const options = ["Трубы, соединения труб", "Унитаз", "Раковина, мойка", "Ванна", "Душевая кабина",
                            "Полотенцесушитель", "Стояк", "Не знаю"];
        return options;
    }
    
    async getListOfMasters(){
        const master = {name: 'Антон Горячев',
                        photo: masterPhoto,
                        stars: '4,8',
                        reviews: 297,
                        about: "Здравствуйте. Произвожу комплекс работ по сантехнике и электрике. От замены санфаянса, розеток, выключателей до прокладки коммуникаций. Буду рад вам помочь.",
                        experience: ["с 1999 г. (25 лет)"],
                        education: ["РосТех строй"],
                        sercicesAndPrice: [["Сантехнические работы", '2500 ₽/точка'], 
                                            ["Аварийные сантехники", '1500 ₽/усл.'],
                                            ["Замена смесителя", '700 ₽/шт.']],
                        reviewsExample: {stars: '5',
                                        date: '13 декабря 2023',
                                        from: 'Владислав',
                                        topic: 'Сантехника',
                                        text: 'Все хорошо и без лишних вопрос сделал задачу о которой мы договорились',
                                        price: '3000 ₽'}
                        };
        const master228 = {name: 'Антон Горячев',
                        photo: masterPhoto,
                        stars: '4,8',
                        reviews: 297,
                        about: "Здравствуйте. Произвожу комплекс работ по сантехнике и электрике. От замены санфаянса, розеток, выключателей до прокладки коммуникаций. Буду рад вам помочь.",
                        experience: ["с 1999 г. (25 лет)"],
                        education: ["РосТех строй"],
                        sercicesAndPrice: [["жопа", '2500 ₽/точка']],
                        reviewsExample: {stars: '5',
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

export default new TopicController();