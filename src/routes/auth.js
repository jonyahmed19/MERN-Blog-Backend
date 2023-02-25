const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth");
const blogController = require('../controllers/blog')
const AuthVerify = require('../middlewares/AuthVerifyMiddleware')
const RoleVerify = require('../middlewares/CheckRoleVerifyMiddleware')





router.get('/health', authController.healthCheck);
router.post('/register', authController.registration)
router.post('/login', authController.login)
router.post('/profileUpdate', AuthVerify, RoleVerify, authController.profileUpdate);
router.get('/profileDetails', AuthVerify, authController.profileDetails);

/***
 * Reset Password
 */
router.get('/recoverVerifyEmail/:email', authController.recoverVerifyEmail)
router.get('/recoverVerifyOTP/:email/:otp', authController.recoverVerifyOTP)
router.post('/recoverResetPass', authController.recoverResetPass)








module.exports = router;