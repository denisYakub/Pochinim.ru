import User from "../controllers/USER-controller";

async function checkForAccessInCreateTopic(){

    if(localStorage.getItem('token')){
        const ret = await User.checkAuth();

        if(ret?.message){
            return false;
        }else{
            return true;
        }
    }
    return false;
}

async function getListOfExistingTopics(){
    const options = ["Сантехник ремонт", "Сантехник ремонт стояка",
                        "Сантехник онлайн", "Сантехник эксперт", 
                        "Сантехник срочно"];
    return options;
}

async function getListOfWork(){
    const options = ["Срочная помощь при аварии", "Прочистка канализации",
                        "Устранение течи", "Ремонт сантехники", 
                        "Установка или замена сантехники", "Демонтаж сантехники",
                        "Дистанционная консульация сантехника"];
    return options;
}

async function getListOfWhatHappend(){
    const options = ["Течь", "Засор", "Ржавчина"];
    return options;
}

async function getListofWhereIsProblem(){
    const options = ["Трубы, соединения труб", "Унитаз", "Раковина, мойка", "Ванна", "Душевая кабина",
                        "Полотенцесушитель", "Стояк", "Не знаю"];
    return options;
}

export {checkForAccessInCreateTopic, getListOfExistingTopics, getListOfWork, getListOfWhatHappend, getListofWhereIsProblem};