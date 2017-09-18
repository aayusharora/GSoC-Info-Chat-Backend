/**
 * Created by rishabhkhanna on 18/09/17.
 */
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/gsocidb";
mongoClient.connect(url,function (err,db){
    module.exports = db;
});



