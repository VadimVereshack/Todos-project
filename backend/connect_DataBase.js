const congig = require('../config.js');
const { MongoClient } = require('mongodb'); 

const uri = congig.DATABASE.URI;
const client = new MongoClient(uri); 

let dataBase;

async function connectDB() {
    try {
        await client.connect();
        console.log('DataBase connected...')
        dataBase = client.db(congig.DATABASE.NAME);
    } catch (err) {
        console.error("Ошибка:", err);
    }
}

async function getUsersColletion(){
    if(dataBase){
        return dataBase.collection(congig.DATABASE.COLLECTION_USERS);
    } else {
        await connectDB();
        if(dataBase) return dataBase.collection(congig.DATABASE.COLLECTION_USERS);
    }
    return null;
};

async function getTodosCollection(){
    if(dataBase){
        return dataBase.collection(congig.DATABASE.COLLECTION_TODOS);
    } else {
        await connectDB();
        if(dataBase) return dataBase.collection(congig.DATABASE.COLLECTION_TODOS);
    }
    return null;
};

module.exports = {getUsersColletion, getTodosCollection};