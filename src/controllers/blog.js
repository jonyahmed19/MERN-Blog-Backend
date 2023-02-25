const mongoose = require('mongoose');
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UsersModel');
const ObjectId = mongoose.Types.ObjectId
const {slugify} = require("../utils/helper");


exports.createPost = async (req, res) =>{
    try{
        const user = await  UserModel.findOne({email: req.headers.email})
        const reqBody = req.body;
        reqBody.authorId = user._id
        reqBody.slug = slugify(reqBody.title);




        const result = await PostModel.create(reqBody);

        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.getPosts = async (req, res) =>{
    try{
        const result = await PostModel.aggregate([
            {$lookup: {from: "users",localField: "authorId", foreignField: "_id", as: "name"}},
            {$project: {
                    title: 1,
                    slug: 1,
                    excerpt: 1,
                    description: 1,
                    author: {
                        $concat: [
                            {$first: '$name.firstName'}, ' ', {$first: '$name.lastName'}
                        ]
                    },
                    authorId: 1,
                    createdDate: 1

                }
            }
        ]);

        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.getSinglePost = async (req, res) =>{
    const id = req.params.id
    try{


        const result = await PostModel.aggregate([
            {$match: {_id: ObjectId(id)}},
            {$lookup: {from: "users",localField: "authorId", foreignField: "_id", as: "name"}},
            {$project: {
                    title: 1,
                    slug: 1,
                    excerpt: 1,
                    description: 1,
                    author: {
                        $concat: [
                            {$first: '$name.firstName'}, ' ', {$first: '$name.lastName'}
                        ]
                    },
                    authorId: 1,
                    createdDate: 1

                }
            }
        ]);
        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.getPostsbyAuthor = async (req, res) =>{
    const authorId = req.params.authorId
    try{


        const result = await PostModel.aggregate([
            {$match: {authorId: ObjectId(authorId)}},
            {$lookup: {from: "users",localField: "authorId", foreignField: "_id", as: "name"}},
            {$project: {
                    title: 1,
                    slug: 1,
                    excerpt: 1,
                    description: 1,
                    author: {
                        $concat: [
                            {$first: '$name.firstName'}, ' ', {$first: '$name.lastName'}
                        ]
                    },
                    authorId: 1,
                    createdDate: 1

                }
            }
        ]);
        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.searchPosts = async (req, res) =>{
    const searchValue = req.params.searchValue;
    try{
        const result = await PostModel.aggregate([
            {$match: {$or: [
                        {
                            title: {$regex: searchValue, $options: 'i'}
                        },
                        {
                            description: {$regex: searchValue, $options: 'i'}
                        },
                        {
                            excerpt: {$regex: searchValue, $options: 'i'}
                        },


                        ]}},
            {$lookup: {from: "users",localField: "authorId", foreignField: "_id", as: "name"}},
            {$project: {
                    title: 1,
                    slug: 1,
                    excerpt: 1,
                    description: 1,
                    author: {
                        $concat: [
                            {$first: '$name.firstName'}, ' ', {$first: '$name.lastName'}
                        ]
                    },
                    authorId: 1,
                    createdDate: 1

                }
            }
        ]);
        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.updateSinglePost = async (req, res) =>{
    const id = req.params.id;
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    reqBody.slug = slugify(reqBody.title);
    try{

        const result = await PostModel.updateOne({_id: id}, {$set: reqBody});

        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.removeSinglePost = async (req, res) =>{
    const id = req.params.id;

    try{

        const result = await PostModel.deleteOne({_id: id});

        if(result){
            res.status(200).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}










