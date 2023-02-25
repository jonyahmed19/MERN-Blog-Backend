const UserModel = require('../models/UsersModel');
module.exports= async (req, res, next) =>{

    try{

        const email = req.headers.email;

        const result = await UserModel.findOne(  {email: email})


        if(result.admin === false && result.author === false ){
             return res.status(200).json({
                    status: "fail",
                    data: "invalid request"
                })
        }else {

            req.headers.author = result.author;
            req.headers.admin = result.admin;
            req.headers.email = req.body.email || req.headers.email

            next();
        }

    }catch (err){
        return res.status(401).json({
            status: "unauthorized",
            data: "unauthorized request role"
        })
    }
}