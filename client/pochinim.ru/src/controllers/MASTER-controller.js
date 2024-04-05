import {makeAutoObservable} from "mobx"

class MasterController{
    constructor(){
        makeAutoObservable(this);
    }

    async registrate(){
        
    }

    async getReviewsById(){
        
    }
};

export default new MasterController();