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

    constructor(){
        this.#fio = [null, null, null];
        this.#occupation = null;
        this.#working_from = null;
        this.#address = null;
        this.#selected_options_location = null;
        this.#photo = null;
        this.#email = null;
        this.#code = null;
        this.#password = null;
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
        }else{
            throw new Error('Пустое значение');
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
}

export default new Master();