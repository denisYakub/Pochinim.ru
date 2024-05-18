import { makeAutoObservable } from "mobx";
class TopicController{

    constructor(){
        makeAutoObservable(this)
    }
    async createNewTopic(topic_name, fio, phoneNumber, need,
            problem, problem_location, address, date,
            {payment_option, price_start, price_end}, {details_text, details_files}, 
            mail, token
        ){

            const body = {"topicName": topic_name, "fio": fio, "phoneNumber": phoneNumber,
                            "need": need, "problem": problem, "problemLocation": problem_location,
                            "address": address, "date": date, "payment":payment_option, 
                            "priceStart": price_start, "priceEnd": price_end,
                            "detailsTxt":  details_text, "mail": mail};

            const resultFromServer = await (await fetch(`http://localhost:4000/api/topics`,{
                    credentials: 'include',
                    method: 'POST',
                    headers : {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })).json()
            
            if(resultFromServer?.id_topic){
            
                const files = new FormData();
                
                for(let i = 0; i < details_files.length; i++){
                    files.append('topicMainPhotos', details_files[i]);
                }
                
                await fetch(`http://localhost:4000/api/topics/${resultFromServer.id_topic}`,{
                    method: "PUT",
                    body: files
                });
                
                return resultFromServer.id_topic;
            }else{
                return resultFromServer;
            }
        
    }

    async getPhotosByIdTopic(id_topic){

        const token = localStorage.getItem('token');

        const paths = await (await fetch(`http://localhost:4000/api/topics/images/${id_topic}`, {
            method: 'GET',
            credentials: 'include',
            headers : {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })).json()

        var images = [];

        for(const path of paths){

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

            images.push(obj)
        }

        return images;
    }

    async getAllTopicsForMaster(){
        const result = await fetch(`http://localhost:4000/api/topics`,{
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
        })

        return await result.json();
    }

    async getTopicById(id_topic){
        const result = await fetch(`http://localhost:4000/api/topics/by/${id_topic}`,{
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
        })

        return await result.json();
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