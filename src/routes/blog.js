const express = require('express');
const router = express.Router();
const AuthVerify = require("../middlewares/AuthVerifyMiddleware");
const RoleVerify = require("../middlewares/CheckRoleVerifyMiddleware");
const blogController = require("../controllers/blog");


/***
 * Posts
 */
router.post('/createPost', AuthVerify, RoleVerify, blogController.createPost)
router.get('/getPosts', blogController.getPosts)
router.get('/getSinglePost/:id',  blogController.getSinglePost)
router.post('/updateSinglePost/:id', AuthVerify, RoleVerify, blogController.updateSinglePost)
router.get('/removeSinglePost/:id', AuthVerify, RoleVerify, blogController.removeSinglePost)
router.get('/searchPosts/:searchValue',  blogController.searchPosts)
router.get('/getPostsbyAuthor/:authorId',  blogController.getPostsbyAuthor)






module.exports = router;