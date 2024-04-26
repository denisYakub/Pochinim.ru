const fs = require('fs');

class PhotoController{
    async getSinglePhoto(req, res, next){
        try {
            const path = req.params.path;

            const full_path_name = `C:\\Users\\denis\\VSCode_projects\\Pochinim.ru\\server\\${path}`;
            var data = null;
    
            if(fs.existsSync(full_path_name)){
                data = 'yes';
                return res.sendFile(full_path_name);
                
            }else{
                data = 'no';
            }
    
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PhotoController();