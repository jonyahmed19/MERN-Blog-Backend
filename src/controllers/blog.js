const PostModel = require('../models/PostModel');
const {slugify} = require("../utils/helper");


exports.createPost = async (req, res) =>{
    try{
        const reqBody = req.body;
        reqBody.email = req.headers.email;
        reqBody.slug = slugify(reqBody.title)
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
        const result = await PostModel.find({});

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

        const result = await PostModel.findOne({_id: id})


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










