const {Profiles} = require("../models");

class Controllers{

    static getProfiles(req,res){
        console.log("masuk ke cntroller support");
        Profiles.findAll({where:{user_id:req.user.id}})
        .then(data=>{
            console.log(data,"from profile");
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);        
        })
    }

    static updateProfile(req,res){
        let {name, date_of_birth, phone, address, church} = req.body
        let obj = {
            name, date_of_birth, phone, address, church
        }
        console.log(obj,"objk untuk update profile");
        Profiles.update(obj,{where:{user_id:req.user.id}})
        .then(resp=>{
            res.status(200).json(resp);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    }

    // static setProfileId(req,res){

    //     let data = {user_id:req.body.payload}
    //     // console.log(data,"from set profile");
    //     Profiles.create(data)
    //     .then(resp=>{
    //         console.log(resp,"from controlller set ID profile");
    //         res.status(201).json(resp);
    //     })
    //     .catch(err=>{
    //         res.status(500).json(err);
    //     })
    // }
}
module.exports = Controllers