const express = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');
const passport = require('passport');


router.get('/profile', passport.checkAuthentication, userController.profile);

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
	'local',
	{failureRedirect:'/users/sign-in'}
) , userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;