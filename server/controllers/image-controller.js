const fs = require('fs');

class PhotoController{
    async getSinglePhoto(req, res, next){
        try {
            const { path } = req.body;

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

    async getMastersPhoto(req, res, next){
        try {
            const id_master = req.params.id_master;

            var full_path_name = `C:\\Users\\denis\\VSCode_projects\\Pochinim.ru\\server\\images\\mastersphoto\\${id_master}\\`;

            var data = null;

            var masters_file;

            fs.readdirSync(full_path_name).forEach(file => {
                masters_file = file;
            })

            if(fs.existsSync(full_path_name + masters_file)){
                data = 'yes';
                
                return res.sendFile(full_path_name + masters_file);
                
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