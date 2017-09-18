/**
 * Created by rishabhkhanna on 18/09/17.
 */
const express = require('express');
const route = express.Router();
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/gsocidb";

mongoClient.connect(url,function (err,db) {
    route.post('/new', (req, res) => {
        let user = createUser(req.body);
        db.collection('users').findOne({email: user.email},(err,result)=>{
            console.log(result)
            if(result === null){
                db.collection('users').insertOne(createUser(req.body), (err, result) => {
                    if(err){
                        res.send({success: false, err: err})
                    }
                    res.send({success: true, result})
                })
            }else{
                res.send({success: false, err: 'user already exist'})
            }
        });
    });

    route.get('/getUser', (req, res) => {
        console.log(req.query);
        db.collection('users').find({uid: req.query.uid}).toArray((err, results) => {
            if (err) {
                res.send({success: false, err: err})
            }
            res.send({success: true, results});
        })
    });

    route.get('/getAllUsers',(req,res)=>{
       db.collection('users').find().toArray((err,results)=>{
           if(err){
               res.send({success: false, err: err})
           }
           res.send({success: true, results:results});
       })
    });

    function createUser(thisUser) {
        let user = {
            uid: generateUniqueID(),
            name: thisUser.name,
            email: thisUser.email,
            college: thisUser.college,
            branch: thisUser.branch,
            isGsocMentor: thisUser.isGsocMentor,
            isGsocParticipant: thisUser.isGsocParticipant,
            githubLink: thisUser.githubLink
        };
        return user;
    }

    let generateUniqueID = () => {
        "use strict";
        let firstPart = (Math.random() * 46656) | 0;
        let secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    };
});

module.exports = route;