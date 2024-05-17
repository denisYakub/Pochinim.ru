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
router.put('/users/:id_user',
                multerMiddleware.single('userPhoto'),
                userController.setUserPhoto);
//=================================================

//==================Masters========================
router.post('/masters',
            masterController.registration);
router.put('/masters',
            masterController.updateMasterField);       
router.get('/refresh-master', 
                masterController.refresh);
router.post('/masters/login', 
                masterController.login); 
router.post('/masters/logout', 
                masterController.logout);
router.get('/masters/check_email/:email', 
                masterController.checkEmail);
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
router.get('/topics',
                topicController.getAllTopics); 
router.get('/topics/by/:id_topic',
                topicController.getTopicById);                         
router.put('/topics/:id_topic',
                multerMiddleware.any('topicMainPhotos'),
                topicController.saveFileForTopic);
router.get('/topics/images/:id_topic',
                topicController.getPathsOfTopicImgs);
router.get('/topics/:email',
                authMiddleware,
                topicController.getAllUsersTopics);
//=================================================

//==================Photos=========================
router.post('/photos/',
            imageController.getSinglePhoto);
router.get('/photos/masters/:id_master',
            imageController.getMastersPhoto);
//=================================================

//==================Chats==========================
router.post('/chats',
            chatController.getChat);
router.get('/chats/users/:id_sender/:id_topic',
            chatController.getChatsUser);
router.get('/chats/masters/:id_sender',
            chatController.getChatsMaster);
router.get('/messages/:id_chat',
            chatController.getMessages);  
router.post('/messages/:id_chat',
            chatController.sendMessage); 
//=================================================
module.exports = router;