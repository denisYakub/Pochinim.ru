import { makeAutoObservable } from "mobx";
import userController from "./USER-controller";
class TopicController{

    constructor(){
        makeAutoObservable(this)
    }

    async createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
        address, date, paymentOption, priceStart, priceEnd, detailsText, detailsFiles}){
        const body = {"topicName": topic, "fio": FIO, "phoneNumber": phoneNumber,
                            "need": need, "problem": problem, "problemLocation": problemLocation,
                            "address": address, "date": date, "payment":paymentOption, 
                            "priceStart": priceStart, "priceEnd": priceEnd,
                            "detailsTxt": detailsText, "mail": localStorage.getItem("mail")};

        var dataTopic = await fetch(`http://localhost:4000/api/topics`, {
            credentials: "include",
            method: "POST", 
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });

        if(dataTopic.status == 401){
            await userController.refreshUserTokens();

            dataTopic = await fetch(`http://localhost:4000/api/topics`, {
                credentials: "include",
                method: "POST", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });
        }

        var id_topic;

        if(dataTopic.status == 200){
            id_topic = (await dataTopic.json())?.id_topic;
            const files = new FormData();

            for(let i = 0; i < detailsFiles.length; i++){
                files.append('topicMainPhotos', detailsFiles[i]);
            }
                
            await fetch(`http://localhost:4000/api/topics/${id_topic}`,{
                method: "PUT",
                body: files
            });
        }

        return id_topic;
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
};

const topicController = new TopicController();

export default topicController;