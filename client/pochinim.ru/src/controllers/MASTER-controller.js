import {makeAutoObservable} from "mobx"

class MasterController{
    constructor(){
        makeAutoObservable(this);
    }

    async registrate(){
        
    }
};

export default new MasterController();