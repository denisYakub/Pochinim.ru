import { makeAutoObservable } from "mobx";

class Topic{

    constructor(){
        makeAutoObservable(this)
    }
    async createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
        address, date, paymentOption, detailsText, detailsFiles, accountID}){
        try {
            const mail = localStorage.getItem("mail");

            const body = {"topicName": topic, "fio": FIO, "phoneNumber": phoneNumber,
                            "need": need, "problem": problem, "problemLocation": problemLocation,
                            "address": address, "date": date, "payment":paymentOption, 
                            "detailsTxt": detailsText, "detailsFiles": detailsFiles, 
                            "mail": mail};

            const data = await fetch("http://localhost:4000/api/", {
                credentials: "include",
                method: "POST", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    body: JSON.stringify(body)
                }
            })

            const bot = await data.json();

            return bot;
        } catch (error) {
            console.log("Error in createNewTopic:", error);
        }
    }
};

export default new Topic();