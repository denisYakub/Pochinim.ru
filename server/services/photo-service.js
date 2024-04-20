const fs = require('fs');

class PhotoService{
    async sendPhotoByPath(res, path){
        const full_path_name = `C:\\Users\\denis\\VSCode_projects\\Pochinim.ru\\server\\${path}`;
        var data = null;

        if(fs.existsSync(full_path_name)){
            data = 'yes';
            return res.download(full_path_name, 'masters_photo');
        }else{
            data = 'no';
        }

        return data;
    }
}

module.exports = new PhotoService();