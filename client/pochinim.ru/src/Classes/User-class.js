import userController from "../controllers/USER-controller";

class User{
    #email;
    #code;
    #password;
    #name;

    constructor(){
        this.#email = null;
        this.#code = null;
        this.#password = null;
        this.#name = null;
    }

    async #checkEmailInBD(email){
        return (await userController.checkUserEmailInBd(email));
    }

    async sendCode(){
        if(this.#email != null){
            this.#code = await userController.getSendCode(this.#email);
        }else{
            throw new Error('Поле пусто');
        }
    }

    compareUserInputCode(code){
        if(this.#code != null && this.#code == code){
            return true;
        }else{
            return false;
        }
    }

    needToRegistrate(){
        if(this.#code != null){
            return true;
        }else{
            return false;
        }
    }

    async logInUser(){
        if(this.#email != null && this.#password != null){
            const result = await userController.logInUser(this.#email, this.#password);
        }
    }

    async registrateUser(){
        if(this.#email != null && this.#password != null && this.#name != null){
            const result = await userController.registrate(this.#email, this.#name, this.#password);
        }
    }

    set email(new_email){
        if(new_email == ' ' || new_email == '' || new_email == null){
            throw Error('Пустое значение')
        }else if(!new_email.includes('@')){
            throw new Error('Не почта');
        }else if(this.#checkEmailInBD(new_email)){
            throw new Error('Пользователь существует');
        }else{
            this.#email = new_email;
        }
    }

    get email(){
        return this.#email;
    }

    set password(new_password){
        if(new_password == null || new_password == '' || new_password == ' '){
            throw new Error('Пустое значение')
        }else if(new_password.length < 8){
            throw new Error('Пароль меньше 8 символов')
        }else if(!/\d/.test(new_password)){
            throw new Error('Пароль дожен включать 1 цифру')
        }else if(/^\d+$/.test(str)){
            throw new Error('Пароль дожен включать 1 букву')
        }else{
            this.#password = new_password;
        }
    }

    get password(){
        return this.#password;
    }

    set name(new_name){
        if(new_name == null || new_name == '' || new_name == ' '){
            throw new Error('Пустое значение')
        }else{
            this.#name = new_name;
        }
    }

    get name(){
        return this.#name;
    }
}

export default new User();