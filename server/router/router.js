const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const topicController = require('../controllers/topic-controller');
const router = new Router();
const multerMiddleware = require('../middleware/multer-middleware');
const masterController = require('../controllers/master-controller');
const imageController = require('../controllers/image-controller');

//===================Users=========================
router.post('/users', 
                userController.registration);
router.put('/users',
            authMiddleware,
            userController.updateUserInfo)
router.get('/users/:email',
                authMiddleware,
                userController.getUserInfo);
router.post('/users/login', 
                userController.logIn);
router.post('/users/logout', 
                userController.logOut);
router.get('/refresh', 
                userController.refresh);
router.get('/users/check_email/:email', 
                userController.checkEmail);
router.post('/users/send_code/:email', 
                userController.sendActivationMail);
//=================================================

//==================Masters========================
router.post('/masters',
            masterController.registration);
router.get('/masters/:from/:to',
            masterController.getListOfMastersAndReviews);
router.get('/masters/:id',
            masterController.getMasterFullInfo);
router.put('/masters/:id_master',
            multerMiddleware.single('masterPhoto'),
            masterController.setMasterPhoto);
//=================================================

//==================Topics=========================
router.post('/topics',
            authMiddleware,
            topicController.createTopic);
router.put('/topics/:id_topic',
            multerMiddleware.any('topicMainPhotos'),
            topicController.saveFileForTopic);
router.get('/topics/:email',
            authMiddleware,
            topicController.getAllUsersTopics)
//=================================================

//==================Photos=========================
router.get('/photos/:path',
            imageController.getSinglePhoto);
//=================================================
module.exports = router;