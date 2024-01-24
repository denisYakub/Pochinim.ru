const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');
const router = new Router();

router.post('/registration', userController.registration);
router.post('/logIn', userController.logIn);
router.post('/logOut', userController.logOut);
router.get('/activate/', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users',
            authMiddleware,
            userController.getUsers);

module.exports = router;