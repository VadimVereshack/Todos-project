const config = require('../config.js');
const jwt = require('jsonwebtoken');
 

function checkAuth(req, res, next){
    const cookies = req.cookies;
        if(!cookies || !cookies.token) return res.sendStatus(400);
    
    let payload;
    try{
        payload = jwt.verify(cookies.token, config.JWT.SECRET);
    } catch(err){
        return res.sendStatus(401);
    };
    req.author_id = payload.author_id;
    next();
}

module.exports = {checkAuth}