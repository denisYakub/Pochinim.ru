const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination(req, file, cd){
        const id_topic = req.params?.id_topic;

        const dir = `images/${id_topic}`;
        fs.mkdirSync(dir);
        
        cd(null, dir);
    },
    filename(req, file, cd){
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