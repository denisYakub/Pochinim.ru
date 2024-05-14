import masterController from "../controllers/MASTER-controller";
import userController from "../controllers/USER-controller";

class Master{
    #fio;
    #occupation;
    #working_from;
    #address;
    #selected_options_location;
    #photo;
    #email;
    #code;
    #password;

    #registration_date;

    #about_me;
    #gender;
    #phone_number
    #documents;
    #education;
    #experience;
    #sercices_price
    #city;

    #reviews;
    #reviews_count;
    #reviews_stars;


    constructor(){
        this.#fio = 'null, null, null';
        this.#occupation = null;
        this.#working_from = null;
        this.#address = null;
        this.#selected_options_location = [];
        this.#photo = null;
        this.#email = null;
        this.#code = null;
        this.#password = null;

        this.#registration_date = null;

        this.#about_me = null;
        this.#gender = null;
        this.#phone_number = null;
        this.#documents = [];
        this.#education = [];
        this.#experience = [];
        this.#sercices_price = [];
        this.#city = null;

        this.#reviews = [];
        this.#reviews_count = null;
        this.#reviews_stars = null;
    }

    async sendCode(){
        if(this.#email == null){
            throw new Error('Пустое значение');
        }else if(await masterController.checkMasterInBd(this.#email)){
            throw new Error('Аккаунт существует');
        }else{
            this.#code = await userController.getSendCode(this.#email);
        }
    }
    
    #compareCodes(code){
        if(this.#code == code && this.#code != null){
            return true;
        }else{
            return false;
        }
    }

    codeSend(){
        if(this.#code != null){
            return true;
        }else{
            return false;
        }
    }

    async registrateMaster(city){
        if(this.#fio != null && this.#occupation != null && this.#working_from != null && 
            ( this.#address != null || this.#selected_options_location != null ) &&
            this.#email != null && this.#photo != null && this.#password != null && city != null
        ){
            const result = await masterController.registrate(this.#fio, this.#occupation, this.#working_from,
                this.#address, this.#selected_options_location, this.#email, this.#photo, this.#password, city
            );
            console.log(await result.json());
        }else{
            throw new Error('Пустое значение');
        }
    }

    async logInMaster(){    
        if(this.#email == null || this.password == null){
            throw new Error('Пустое значение');
        }else if(!await masterController.checkMasterInBd(this.#email)){
            throw new Error('Аккаунт не существует');
        }else{
            const result = await masterController.logInMaster(this.#email, this.password);
            console.log(await result.json());
        }
    }

    async setAllMasterDataById(id_master){
        const result_master = await masterController.getWholeInfById(id_master);
        //const result_reviews = await masterController.getReviewsById(id_master);
        
        this.#email = result_master.master_email;

        this.#fio = result_master.fio;
        this.#occupation = result_master.occupation;
        this.#photo = await masterController.getMasterPhotoByPath(result_master.master_photo_path);

        if(result_master.working_from == 1){
            this.#selected_options_location = result_master.selected_options_of_location;
        }else if(result_master.working_from == 2){
            this.#address = result_master.location
        }

        this.#about_me = result_master.about_me;
        this.#documents = result_master.documents;
        this.#education = result_master.education;
        this.#experience = result_master.experience;
        this.#sercices_price = result_master.sercices_price;
        this.#city = result_master.city;

        this.#reviews = result_master.reviews;
        this.#reviews_count = result_master.reviewsCount;
        this.#reviews_stars = result_master.stars;

        return true;
    }

    async updateMasterField(fieldToUpdate, newValue){
        const fixedNewValue = (JSON.stringify(newValue).split('[').join('{')).split(']').join('}');
        
        var result = await masterController.updateMasterField(fieldToUpdate, fixedNewValue, localStorage.getItem('id-master'));
        if(result?.status == 401){
            //await masterController.refreshMasterTokens();
            result = await masterController.updateMasterField(fieldToUpdate, fixedNewValue, localStorage.getItem('id-master'));
        }
    }

    get fio(){
        return this.#fio;
    }

    set fio(new_fio){
        if(new_fio[0] != null && new_fio[1] != null){
            this.#fio = new_fio;
        }else{
            throw new Error('Пустое значение')
        }
    }

    get occupation(){
        return this.#occupation;
    }

    set occupation(new_occupation){
        if(new_occupation != null){
            this.#occupation = new_occupation;
        }else{
            throw new Error('Пустое значение')
        }
    }

    get workingFrom(){
        return this.#working_from;
    }

    set workingFrom(new_working_from){
        if(new_working_from == 1 || new_working_from == 2){
            this.#working_from = new_working_from;
        }else{
            throw new Error('Пустое значение')
        }
    }

    get address(){
        return this.#address;
    }

    set address(new_address){
        if(new_address != null){
            this.#address = new_address;
        }else{
            throw new Error('Пустое значение')
        }
    }

    get selectedOptionsLocation(){
        return this.#selected_options_location;
    }

    set selectedOptionsLocation(new_selected_options_location){
        if(new_selected_options_location != null){
            this.#selected_options_location = new_selected_options_location;
        }else{
            throw new Error('Пустое значение')
        }
    }

    get email(){
        return this.#email;
    }

    set email(new_email){
        if(new_email == null){
            throw new Error('Пустое значение');
        }else if(!new_email.includes('@')){
            throw new Error('Не почта');
        }else {
            this.#email = new_email;
        }
    }

    get code(){
        return this.#code;
    }
    
    set code(new_code){
        if(new_code == null){
            throw new Error('Пустое значение');
        }if(this.#compareCodes(new_code)){
            throw new Error('Не верный код');
        }else{
            this.#code = new_code;
        }
    }

    get photo(){
        return this.#photo;
    }

    set photo(new_photo){
        if(new_photo != null){
            this.#photo = new_photo;
        }else{
            throw new Error('Пустое значение');
        }
    }

    get password(){
        return this.#password;
    }

    set password(new_password){
        if(new_password == null){
            throw new Error('Пустое значение')
        }else if(new_password.length < 8){
            throw new Error('Пароль меньше 8 символов') 
        }else if(!/\d/.test(new_password)){
            throw new Error('Пароль дожен включать 1 цифру')
        }else if(/^\d+$/.test(new_password)){
            throw new Error('Пароль дожен включать 1 букву')
        }else{
            this.#password = new_password;
        }
    }

    get registrationDate(){
        return this.#registration_date;
    }

    get aboutMe(){
        return this.#about_me;
    }

    get gender(){
        return this.#gender;
    }

    get phoneNumber(){
        return this.#phone_number;
    }

    get documents(){
        return this.#documents;
    }

    get education(){
        return this.#education;
    }

    get experience(){
        return this.#experience;
    }

    get sercicesPrice(){
        return this.#sercices_price;
    }

    get reviews(){
        return this.#reviews;
    }

    get reviewsStars(){
        return this.#reviews_stars;
    }

    get reviewsCount(){
        return this.#reviews_count;
    }

    get city(){
        return this.#city;
    }
}

export default new Master();