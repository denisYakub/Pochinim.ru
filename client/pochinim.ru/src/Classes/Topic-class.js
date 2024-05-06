import topicController from "../controllers/TOPIC-controller";
import userController from "../controllers/USER-controller";

class Topic{
    #topic_id
    #topic_name
    #fio
    #phone_number
    #address
    #mail
    #need
    #problem
    #problem_location
    #date
    #today_date
    #payment
    #details

    constructor(){
        this.#topic_id = null;
        this.#topic_name = null;

        this.#fio = null;
        this.#phone_number = null;
        this.#address = null;
        this.#mail = localStorage.getItem('mail');

        this.#need = null;
        this.#problem = null;
        this.#problem_location = null;
        this.#date = null;
        this.#today_date = new Date();
        this.#payment = {'payment_option': null, 'price_start': null, 'price_end': null};

        this.#details = {'details_text': null, 'details_files': null};
    }

    async saveTopic(){
        try {
            var result;

            if(this.#topic_name != null && this.#fio != null && this.#phone_number != null && this.#need != null &&
                this.#problem != null && this.#address != null && this.#date != null && this.#payment.payment_option != null &&
                this.#details.details_files != null && this.#details.details_text != null && 
                localStorage.getItem('mail') != null && localStorage.getItem("token") != null){

                    result = await topicController.createNewTopic(
                        this.#topic_name, this.#fio, this.#phone_number, this.#need,
                        this.#problem, this.#problem_location, this.#address, this.#date,
                        this.#payment, this.#details, localStorage.getItem('mail'), localStorage.getItem("token"));
                    
            }else{
                result = null;
            }
            

            return result;

        } catch (Error) {
            console.log(Error);
        }
    }
    get topicId(){
        return this.#topic_id;
    }
    set topicId(new_topic_id){
        if(new_topic_id != this.#topic_id && new_topic_id != null){
            this.#topic_id = new_topic_id
        }else{
            throw Error('Ошибка в setter');
        }
    }
    get topicName(){
        return this.#topic_name;
    }
    set topicName(new_topic_name){
        if(new_topic_name != null){
            this.#topic_name = new_topic_name;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get fio(){
        return this.#fio;
    }
    
    set fio(new_fio){
        if(new_fio != null){
            this.#fio = new_fio;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get phoneNumber(){
        return this.#phone_number;
    }

    set phoneNumber(new_phone_number){
        if(new_phone_number != null){
            this.#phone_number = new_phone_number;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get address(){
        return this.#address;
    }

    set address(new_address){
        if(new_address != null){
            this.#address = new_address;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get mail(){
        return this.#mail;
    }

    set mail(new_mail){
        if(new_mail != null){
            this.#mail = new_mail;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get need(){
        return this.#need;
    }

    set need(new_need){
        if(new_need != null){
            this.#need = new_need;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get problem(){
        return this.#problem;
    }

    set problem(new_problem){
        if(new_problem != null){
            this.#problem = new_problem;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get problemLocation(){
        return this.#problem_location;
    }

    set problemLocation(new_problem_location){
        if(new_problem_location != null){
            this.#problem_location = new_problem_location;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get date(){
        return this.#date;
    }

    set date(new_date){
        if(new_date != null){
            this.#date = new_date;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get paymentOption(){
        return this.#payment;
    }

    set paymentOption(new_payment_option){
        if(new_payment_option != null){
            this.#payment.payment_option = new_payment_option;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get paymentPriceStart(){
        return this.#payment.price_start;
    }

    set paymentPriceStart(new_price_start){
        if(new_price_start != null){
            this.#payment.price_start = new_price_start;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get paymentPriceEnd(){
        return this.#payment.price_end;
    }

    set paymentPriceEnd(new_price_end){
        if(new_price_end != null){
            this.#payment.price_end = new_price_end;
        }else{
            throw Error('Ошибка в setter');
        }
    }

    get detailsFiles(){
        return this.#details.details_files;
    }

    set detailsFiles(new_details_files){
        this.#details.details_files = new_details_files;
    }

    get detailsText(){
        return this.#details.details_text;
    }

    set detailsText(new_details_text){
        this.#details.details_text = new_details_text;
    }

}

const topic = new Topic();

export default topic;