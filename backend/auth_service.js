const config = require('../config.js');
const jwt = require('jsonwebtoken');
const {getUsersColletion} = require('./connect_DataBase.js');

function getToken(payload){
    return jwt.sign(payload, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES_IN});
}

async function register(req, res){
    const body = req.body;
    if(!body || !body.login || !body.password) return res.status(400).json({error: 'Для регістрації потрібно придумати унікальний логін і пароль'});
    const login = body.login.toLowerCase();
    const password = body.password;
    if(await getUsersByLogin(login)) return res.status(401).json({error: 'Такий логін вже зайнятий'});
    const collection = await getUsersColletion();
    if(!collection) return res.status(500).json({error: 'Помилка серверу'}); 
    collection.insertOne({login, password});
    res.sendStatus(200);
};

async function login(req, res){
    const body = req.body;
    if(!body || !body.login || !body.password) return res.status(400).json({error: 'Невірний логін або, пароль'});
    const login = body.login;
    const password = body.password;
    const user = await getUsersByLogin(login);
    if(!user || user.password != password) return res.status(400).json({error: 'Невірний логін або, пароль'});
    const token = getToken({author_id: user._id});
    res.status(200).json({token});
};

async function getUsersByLogin(login){
    const collection = await getUsersColletion();
    if(!collection) return null;
    const user = await collection.findOne({ login: login });
    return user;
};

module.exports = {register, login};