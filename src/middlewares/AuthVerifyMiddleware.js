
const jwt = require('jsonwebtoken');


module.exports=(req, res, next) =>{

    try{
        const token = req.headers['token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const email = decoded['data'];
        req.headers.email = email;
        next();
    }catch (err){
        return res.status(401).json({
            status: "unauthorized",
            data: "unauthorized request"
        })
    }
}