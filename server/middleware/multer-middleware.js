const multer = require('multer');
const fs = require('fs');
const userService = require('../services/user-service');

const storage = multer.diskStorage({
    async destination(req, file, cd){
        var dir;
        switch (file.fieldname) {
            case 'masterPhoto':
                const id_master = req.params.id_master;
                dir = `images/mastersPhoto/${id_master}`;
                break;
            case 'topicMainPhotos':
                const id_topic = req.params.id_topic;
                dir = `images/topicsMainPhotos/${id_topic}`;
                break;
            case 'userPhoto':
                const id_user = await userService.getUserIdByMail(req.params.id_user);
                dir = `images/userPhotos/${id_user}`;
                break;
            default:
                break;
        }
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cd(null, dir);
    },
    filename(req, file, cd){
        /*var name;
        switch (file.fieldname) {
            case 'masterPhoto':
                name = 'photo'
                break;
            case 'topicMainPhotos':
                
                break;
            default:
                break;
        }*/
        cd(null, file.originalname);
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cd) => {
    if(types.includes(file.mimetype)){
        cd(null, true);
    }else{
        cd(null, false);
    }
}

module.exports = multer({storage, fileFilter});