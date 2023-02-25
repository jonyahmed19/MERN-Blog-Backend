const UserModel = require('../models/UsersModel');
const OTPModel = require('../models/OTPModel');
const jwt = require('jsonwebtoken');
const sendMailUtility = require('../utils/sendEmailUtility')



exports.healthCheck = (req, res) => {
    res.status(200).json({
        status: "success",
        data: "API is working"
    })
}

exports.registration = async (req, res)=>{

    try{
        const reqBody = req.body;
        const result = await UserModel.create(reqBody);

        if(result){
            result.password = undefined;
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
exports.login = async (req, res)=>{

    try{
        const reqBody = req.body;

        const result = await UserModel.aggregate([
            {$match: reqBody},
            {$project: {_id:0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, author: 1, admin: 1}}
        ]);

        if(result){
            const payload = {exp: Math.floor(Date.now()/1000) + (24*60*60), data: result[0].email}
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.status(200).json({
                status: "success",
                token: token,
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
exports.profileUpdate = async (req, res)=>{
    try{
        const reqBody = req.body;
        const email = req.headers.email;
        const author = req.headers.author;
        const admin = req.headers.admin;
        if(!admin){
            reqBody.author = author;
            reqBody.admin = admin;
        }

        if(!admin && reqBody.email){
           return res.status(200).json({
                status: 'fail',
                data: "Invalid Request"
            })
        }



        const result = await UserModel.updateOne(
            {email}, {$set: reqBody}
        )
        if(result){
            res.status(200).json({
                status: "success",
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
exports.profileDetails = async (req, res)=>{
    try{

        const email = req.headers.email;

        const result = await UserModel.findOne(
            {email}
        )
        if(result){
            res.status(200).json({
                status: "success",
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


exports.recoverVerifyEmail = async (req, res)=>{
    const email = req.params.email;
    try{
        const checkEmailExists = await UserModel.aggregate([
            { $match: {email: email} },
            { $count: 'total' }
        ]);

        if(checkEmailExists.length > 0){

            const generatedOtp = Math.floor(100000 + Math.random() * 900000);
            const insertOTP = await OTPModel.create({
                email: email,
                otp: generatedOtp
            });
            const sendEmail = await sendMailUtility(
                email,
                `Your PIN Code is= ${generatedOtp}`,
                "MERN Blog PIN Verification"
            )

            res.status(200).json({
                status: 'success',
                data: sendEmail
            })
        }else {
            res.status(200).json({
                status: 'fail',
                data: "No User Found"
            })

        }


    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.recoverVerifyOTP = async (req, res)=>{
    const email = req.params.email;
    const OTP = req.params.otp;
    try{

        const checkOTP = await OTPModel.aggregate([
            {$match: {email: email,otp: OTP, status: 0}},
            {$count: 'total'}
        ]);
        if(checkOTP.length > 0){
            const updatedOTP = await OTPModel.updateOne(
                {
                    email: email,
                    otp: OTP,
                    status: 0
                },
                { status: 1 }
            )
            res.status(200).json({
                status: 'success',
                data: updatedOTP
            })
        }else {
            res.status(200).json({status: "fail", data: "Invalid OTP Code"})
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}
exports.recoverResetPass = async (req, res)=>{
    const email = req.body['email'];
    const OTP = req.body['otp'];
    const newPass = req.body['password'];

    try{

        const checkOTPUsed = await OTPModel.aggregate([
            {$match: {email: email,otp: OTP, status: 1}},
            {$count: 'total'}
        ]);


        if(checkOTPUsed.length > 0){
            const passUpdate = await UserModel.updateOne(
                { email: email},
                { password: newPass }
            )
            res.status(200).json({
                status: 'success',
                data: passUpdate
            })
        }else{
            res.status(200).json({status: "fail", data: "Invalid Request"})
        }

    }catch (err){
        res.status(200).json({
            status: 'fail',
            data: err
        })
    }
}









