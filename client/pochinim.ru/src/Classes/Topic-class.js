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

    #assistence_hints = [
                            {topic: 'Сантехник', 
                                need_hints: ["Срочная помощь при аварии", "Прочистка канализации",
                                    "Устранение течи", "Ремонт сантехники", 
                                    "Установка или замена сантехники", "Демонтаж сантехники",
                                    "Дистанционная консульация сантехника"],
                                problem_hints: ["Течь", "Засор", "Ржавчина"],
                                problem_location_hints: ["Трубы, соединения труб", "Унитаз", "Раковина, мойка", "Ванна", "Душевая кабина",
                                    "Полотенцесушитель", "Стояк"]},
                            {topic: 'Электроника',
                                need_hints: ['Срочная помощь при поломке', 'Устранение перегрева', 'Замена компонентов', 'Ремонт электроники', 
                                    'Установка или настройка оборудования', 'Демонтаж старого оборудования',
                                ],
                                problem_hints: ['Перегрев', 'Повреждение от воды', 'Неисправность'],
                                problem_location_hints: ['Процессора', 'Зарядный порт', 'Экран', 'Видеокарта', 'Материнская плата', 
                                    'Планшет', 'Смартфон', 'Ноутбук']},
                            {topic: 'Бытовая техника',
                                need_hints: ['Срочная помощь при поломке', 'Устранение утечек', 'Ремонт бытовой техники', 'Установка или замена оборудования',
                                    'Демонтаж старого оборудования', 'Дистанционная консультация'],
                                problem_hints: ['Утечка', 'Поломка', 'Неисправность'],
                                problem_location_hints: ['Дверца холодильника', 'Нагревательный элемент в стиральной машине', 'Мотор пылесоса', 'Стиральная машина' , 
                                    'Посудомоечная машина', 'Плита', 'Микроволновая печь',]},
                            {topic: 'Мебель',
                                need_hints: ['Устранение скрипов', 'Ремонт мебели'],
                                problem_hints: ['Трещины', 'Сколы', 'Износ', 'Скрип'],
                                problem_location_hints: ['Ножка', 'Выдвижной механизм ящика', 'Стол', 'Стуль', 'Диван', 'Обивка диванов', 'Кресло', 'Матрас']},
                            {topic: 'Музыкальные инструменты',
                                need_hints: ['Ремонт музыкальных инструментов', 'Дистанционная консультация', 'Срочная помощь при поломке'],
                                problem_hints: ['Разрыв струн', 'Проблемы с грифом', 'Неисправность звукоснимателя', 'Разладка', 'Поломка клавиш', 'Неисправность механизма молоточков'],
                                problem_location_hints: ['Клапан у духовых инструментов', 'Пианино', 'Барабан', 'Гитара', 'Фортепиано']},
    ]

    constructor(){
        this.#topic_id = null;
        this.#topic_name = '';

        this.#fio = '';
        this.#phone_number = '';
        this.#address = '';
        this.#mail = localStorage.getItem('mail');

        this.#need = '';
        this.#problem = '';
        this.#problem_location = '';
        this.#date = '';
        this.#today_date = new Date();
        this.#payment = {'payment_option': '', 'price_start': '', 'price_end': ''};

        this.#details = {'details_text': '', 'details_files': ''};
    }

    async saveTopic(){
        try {
            var result;

            if(this.#topic_name != '' && this.#fio != '' && this.#phone_number != '' && this.#need != '' &&
                this.#problem != '' && this.#address != '' && this.#date != '' && this.#payment.payment_option != '' &&
                this.#details.details_files != '' && this.#details.details_text != '' && 
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
            throw Error('пустое значение');
        }
    }
    get topicName(){
        return this.#topic_name;
    }
    set topicName(new_topic_name){
        if(new_topic_name == ''){
            throw Error('пустое значение');
        }else if(new_topic_name == '2'){
            throw Error('неверное значение');
        }else{
            this.#topic_name = new_topic_name;
        }
    }

    get fio(){
        return this.#fio;
    }
    
    set fio(new_fio){
        if(new_fio == ''){
            throw Error('пустое значение');
        }else{
            this.#fio = new_fio;
        }
    }

    get phoneNumber(){
        return this.#phone_number;
    }

    set phoneNumber(new_phone_number){
        if(!new_phone_number.includes('+79') || new_phone_number.length != 12){
            throw Error('телефон должен иметь ввид: +79*********');
        }else if(new_phone_number == ''){
            throw Error('пустое значение');
        }else{
            this.#phone_number = new_phone_number;
        }
    }

    get address(){
        return this.#address;
    }

    set address(new_address){
        if(new_address != ''){
            this.#address = new_address;
        }else{
            throw Error('пустое значение');
        }
    }

    get mail(){
        return this.#mail;
    }

    set mail(new_mail){
        if(new_mail != ''){
            this.#mail = new_mail;
        }else{
            throw Error('пустое значение');
        }
    }

    get need(){
        return this.#need;
    }

    set need(new_need){
        if(new_need != ''){
            this.#need = new_need;
        }else{
            throw Error('пустое значение');
        }
    }

    get problem(){
        return this.#problem;
    }

    set problem(new_problem){
        if(new_problem != ''){
            this.#problem = new_problem;
        }else{
            throw Error('пустое значение');
        }
    }

    get problemLocation(){
        return this.#problem_location;
    }

    set problemLocation(new_problem_location){
        if(new_problem_location != ''){
            this.#problem_location = new_problem_location;
        }else{
            throw Error('пустое значение');
        }
    }

    get date(){
        return this.#date;
    }

    set date(new_date){
        if(new_date != ''){
            this.#date = new_date;
        }else if(new_date == this.#today_date.getFullYear()+'-'+this.#today_date.getMonth()+'-'+this.#today_date.getDate()){
            throw Error('неверное значение');
        }else{
            throw Error('пустое значение');
        }
    }

    get paymentOption(){
        return this.#payment.payment_option;
    }

    set paymentOption(new_payment_option){
        if(new_payment_option != ''){
            this.#payment.payment_option = new_payment_option;
        }else{
            throw Error('пустое значение');
        }
    }

    get paymentPriceStart(){
        return this.#payment.price_start;
    }

    set paymentPriceStart(new_price_start){
        if(new_price_start != ''){
            this.#payment.price_start = new_price_start;
        }else{
            throw Error('пустое значение');
        }
    }

    get paymentPriceEnd(){
        return this.#payment.price_end;
    }

    set paymentPriceEnd(new_price_end){
        if(new_price_end != ''){
            this.#payment.price_end = new_price_end;
        }else{
            throw Error('пустое значение');
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