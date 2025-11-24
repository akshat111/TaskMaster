const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

//public 
router.post('/register', authController.register);
router.post('/login', authController.login);

//protected
router.get('/me', auth,authController.getProfile);
router.put("/me", auth,authController.updateProfile);
router.post("/logout", auth, authController.logout);

module.exports = router;