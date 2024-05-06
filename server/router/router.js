const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const topicController = require('../controllers/topic-controller');
const router = new Router();
const multerMiddleware = require('../middleware/multer-middleware');
const masterController = require('../controllers/master-controller');
const imageController = require('../controllers/image-controller');
const chatController = require('../controllers/chat-controller');

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
router.get('/users/send_code/:email', 
                userController.sendActivationMail);
//=================================================

//==================Masters========================
router.post('/masters',
            masterController.registration);
router.get('/refresh-master', 
                masterController.refresh);
router.post('/masters/login', 
                masterController.login); 
router.post('/masters/logout', 
                masterController.logout);
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
router.get('/topics/images/:id_topic',
                authMiddleware,
                topicController.getPathsOfTopicImgs);
router.get('/topics/:email',
                authMiddleware,
                topicController.getAllUsersTopics);
//=================================================

//==================Photos=========================
router.post('/photos/',
            imageController.getSinglePhoto);
//=================================================

//==================Chats==========================
router.post('/chats',
            authMiddleware,
            chatController.getChat);
router.get('/chats/users/:id_sender/:id_topic',
            authMiddleware,
            chatController.getChatsUser);
router.get('/messages/:id_chat',
            authMiddleware,
            chatController.getMessages);  
router.post('/messages/:id_chat',
            authMiddleware,
            chatController.sendMessage); 
//=================================================
module.exports = router;