import {makeAutoObservable} from "mobx"
class MasterController{
    constructor(){
        makeAutoObservable(this);
    }

    async checkMasterInBd(email){
        return false;
    }

    async registrate(fio, occupation, workingFrom, location, selectedOptionsLocation, 
                        email, photo, password, city){

        var selectedOptionsLocationStr = [];
        
        if (selectedOptionsLocation != null) {
            for (const obj of selectedOptionsLocation){
                selectedOptionsLocationStr.push(obj.label)
            }
        }

        const body = {"fio": fio, "occupation": occupation, "workingFrom": workingFrom, "location": location,
                        "selectedOptionsLocation": JSON.stringify(selectedOptionsLocationStr).replace('[', '').replace(']', ''),
                            "email": email, "password": password, "city": city};

        const data = await fetch(`http://localhost:4000/api/masters`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            credentials: 'include',
            body: JSON.stringify(body)
        });
            
        const master = await data.json();

        localStorage.setItem('token-master', master?.accessToken);
        localStorage.setItem('mail-master', email);

        const file = new FormData();
        file.append('masterPhoto', photo);

        const ret = await fetch(`http://localhost:4000/api/masters/${master?.id_master}`,{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: file
        });
          
        if(master?.message || (await ret.json())?.message){
            return false;
        }  
        return true;
    }

    async logInMaster(email, password){
        const body = {'email': email, 'password': password};

        const data = await fetch(`http://localhost:4000/api/masters/login`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, 
            credentials: 'include',
            body: JSON.stringify(body)
        });
        
        const ret = await data.json();

        localStorage.setItem('token-master', ret?.accessToken);
        localStorage.setItem('mail-master', email);
        
        if(ret?.message){
            return false;
        }
        return true;
    }

    async logOutMaster(){
        const data = await fetch(`http://localhost:4000/api/masters/logout`,{
            credentials: 'include',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const ret = await data.json();

        localStorage.removeItem('token-master');
        localStorage.removeItem('mail-master');

        if(ret?.message){
            return false;
        }
        return true;
    }

    async refreshMasterTokens(){
        if(localStorage.getItem('token-master')){
            const data = await fetch(`http://localhost:4000/api/refresh-master`,{
                credentials: 'include',
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const ret = await data.json();

            localStorage.setItem('token-master', ret?.accessToken);

            if(ret?.message){
                return false;
            }else{
                return true;
            }
        }

        return false;
    }

    async getReviewsById(id){
        
    }

    async getWholeInfById(id){
        const data = await fetch(`http://localhost:4000/api/masters/${id}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return (await data.json());
    }

    async getListOfMasters(from, to){
        const data = await fetch(`http://localhost:4000/api/masters/${from}/${to}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const masters = await data.json();

        var fin = [];

        masters?.map(obj => {
            fin.push({
                'id': obj.id,
                'fio': obj.fio,
                'photo_path': obj.photo_path,
                'stars': obj.stars,
                'reviewsCount': obj.reviewsCount,
                'aboutMe': obj.aboutMe,
                'experience': obj.experience,
                'education': obj.education,
                'sercicesAndPrice': obj.sercicesAndPrice,
                'reviews': obj.reviews,
            })
        })

        return fin;
    }

    async getMasterPhotoByPath(path){
        const data = await fetch(`http://localhost:4000/api/photos/${path}`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        const photo = await data.blob();

        const obj = URL.createObjectURL(photo);

        return obj;
    }
};

const masterController = new MasterController();

export default masterController;