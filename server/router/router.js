const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');
const topicController = require('../controllers/topic-controller');
const router = new Router();
const multerMiddleware = require('../middleware/multer-middleware');
const masterController = require('../controllers/master-controller');

router.post('/registration', userController.registration);
router.post('/checkEmail', userController.checkEmail)
router.post('/logIn', userController.logIn);
router.post('/logOut', userController.logOut);3
router.post('/sendActivateCode', userController.sendActivationMail);
router.get('/activate/', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users',
            authMiddleware,
            userController.getUsers);

router.post('/createTopic',
            authMiddleware,
            topicController.createTopic);
router.post('/saveFileForTopic/:id_topic',
            multerMiddleware.single('topicMainPhoto'),
            topicController.saveFileForTopic);

router.post('/registrateMaster',
            masterController.registration);
router.put('/saveMasterPhoto/:id_master',
            multerMiddleware.single('masterPhoto'),
            masterController.setMasterPhoto);
            
module.exports = router;