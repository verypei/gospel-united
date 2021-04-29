require("dotenv").config()
const {Users, Profiles} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Authentication = require("../middleware/authentication");

// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(process.env.CLIENT_ID);

class userController{

    static register(req,res){
        
        let obj = {
            email:req.body.email,
            user_name:req.body.user_name,
            password:req.body.password
        }
        // cari email apakah sudah terdaftar
        Users.findOne({where:{email:obj.email}})
        .then(data=>{
            // console.log(data,"data from register server");
            if(!data){
                // console.log("masuk ke if======>>>>>>>>>>>>>>");
                Users.create(obj)
                .then(data=>{
                    let token = jwt.sign({id: data.id, user_name:data.user_name, email: data.email}, process.env.JWT_SECRET)
                    res.status(201).json({id:data.id,user_name:data.user_name,token:token})
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json(err);
                })
            }
            else{
                // console.log("masuk ke else");
                res.status(403).json({'message':"email already in used"});
            }
        })
        .catch(err=>{
            res.status(500).json(err);
        })


    }

    static login(req,res){
        let email=req.body.email
        let password=req.body.password
        // console.log(email,"---",password,"login---->>>>");
        Users.findOne({
            where:{
                email:email
            }
        })
        .then(data=>{
            if(!data){
                res.status(400).json('email wrong')
            } else {
                // console.log(data,"from login")
                if(bcrypt.compareSync(password, data.password)){
                    let token = jwt.sign({id: data.id, user_name:data.user_name, email: data.email}, process.env.JWT_SECRET)//????????????????
                    res.status(200).json({id:data.id,user_name:data.user_name,token:token})
                } else {
                    res.status(400).json('password wrong');
                }
            }
        })
        .catch(err=>{
            res.status(404).json(err)
        })
    }

    // static googleSignin(req, res, next) {
    //     console.log('google')
    //     client.verifyIdToken({
    //         idToken: req.body.id_token,
    //         audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    //         // Or, if multiple clients access the backend:
    //         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    //     })
    //         .then(ticket => {
    //             const payload = ticket.getPayload();
    //             console.log(payload,"payloadddddddd")
    //             User.findOne({
    //                 where: {
    //                     email: payload.email
    //                 }
    //             })
    //                 .then(data => {
    //                     if (data) {
    //                         return data
    //                     }
    //                     else {
    //                         let obj = {
    //                             email: payload.email,
    //                             password: process.env.GOOGLE_SECRET
    //                         }
    //                         return User.create(obj)
    //                     }
    //                 })
    //                 .then(data => {
    //                     if (data) {
    //                         var token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
    //                     }
    //                     console.log(token, "tokeeeeeen")
    //                     res.status(200).json({ token: token })
    //                 })
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })
    // }
}
module.exports=userController