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

const masterController = new MasterController();

export default masterController;