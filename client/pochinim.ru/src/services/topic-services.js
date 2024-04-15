class TopicServices{
    async createNewTopic({topic, FIO, phoneNumber, need, problem, problemLocation,
        address, date, paymentOption, detailsText, detailsFiles, mail}){
        try {
            
            const body = {"topicName": topic, "fio": FIO, "phoneNumber": phoneNumber,
                            "need": need, "problem": problem, "problemLocation": problemLocation,
                            "address": address, "date": date, "payment":paymentOption, 
                            "detailsTxt": detailsText, "mail": mail};

            const dataTopic = await fetch("http://localhost:4000/api/createTopic", {
                credentials: "include",
                method: "POST", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            })

            const bot = await dataTopic.json();

            return bot?.id_topic;
        } catch (error) {
            console.log("Error in createNewTopic:", error);
        }
    }

    async addFilesToTopic(id_topic, detailsFiles){
        try {
            if(id_topic){
                const file = new FormData();
                file.append('topicMainPhoto', detailsFiles);
    
                await fetch(`http://localhost:4000/api/saveFileForTopic/${id_topic}`, {
                method: "POST",
                body: file
                })
            }
        } catch (error) {
            console.log("Error in addFilesToTopic:", error);
        }
    }
}

const topicServices = new TopicServices()

export default topicServices;