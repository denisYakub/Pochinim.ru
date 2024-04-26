import { makeAutoObservable } from "mobx";
import fetchServices from "../services/fetch-services";
class TopicController{

    constructor(){
        makeAutoObservable(this)
    }

    async createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
        address, date, paymentOption, detailsText, detailsFiles}){

        const mail = localStorage.getItem("mail");

        const body = {"topicName": topic, "fio": FIO, "phoneNumber": phoneNumber,
                            "need": need, "problem": problem, "problemLocation": problemLocation,
                            "address": address, "date": date, "payment":paymentOption, 
                            "detailsTxt": detailsText, "mail": mail};

        const id_topic = (await fetchServices.fetchPOSTWithCredentialsAndAuthorization(`/topics`, JSON.stringify(body), localStorage.getItem('token'))).id_topic;
        /*const id_topic = await topicServices.createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
            address, date, paymentOption, detailsText, detailsFiles, mail})*/
        
        //topicServices.addFilesToTopic(id_topic, detailsFiles);
        const files = new FormData();

        for(let i = 0; i < detailsFiles.length; i++){
            files.append('topicMainPhotos', detailsFiles[i]);
        }
        
        const ret = await fetchServices.fetchPUTFiles(`/topics/${id_topic}`, files);
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