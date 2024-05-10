import documentsController from "../controllers/Documents-controller";

class Documents{
    #passport;
    #photo_face_passport;

    constructor(){
        this.#passport = { country: null, 
                            series: null, number: null, 
                            fio: null, date: null, code: null, who_gave: null, photo: null };
        this.#photo_face_passport = null;
    }

    #checkForMissingField(new_passport){
        if(new_passport.country == null || new_passport.series == null 
            || new_passport.number == null || new_passport.fio == null 
            || new_passport.date == null || new_passport.code == null 
            || new_passport.who_gave == null || new_passport.photo == null
        ){
            return true;
        }

        return false;
    }

    async sendPassport(){
        if(this.#checkForMissingField(this.#passport) && this.#photo_face_passport == null){
            throw new Error('Пустое поле');
        }else{
            const result = await documentsController.sendPassportOnVerification(this.#passport, this.#photo_face_passport);
        }
    }
    get passport(){
        return this.#passport;
    }
    
    set passport(new_passport){
        console.log(new_passport);
        if(this.#checkForMissingField(new_passport)){
            throw new Error('Пустое поле');
        }else{
            this.#passport = new_passport;
        }
    }

    get photoFacePassport(){
        return this.#photo_face_passport;
    }
    set photoFacePassport(new_photo_face_passport){
        if(new_photo_face_passport != null){
            this.#photo_face_passport = new_photo_face_passport
        }else{
            throw new Error('Пустое поле');
        }
    }
}

export default new Documents();