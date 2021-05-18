const {Profiles} = require("../models");

class Controllers{

    static getProfiles(req,res){
        // console.log("masuk ke cntroller profile");
        Profiles.findOne({where:{user_id:req.user.id}})
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);        
        })
    }

    static getOtherProfiles(req,res){
        let id = req.params.id
        console.log(id,"masuk ke cntroller get other profile");
        Profiles.findOne({where:{user_id:id}})
        .then(data=>{
            console.log(data.dataValues,"---->");
            res.status(200).json(data.dataValues);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);        
        })
    }

    static updateProfile(req,res){
        let {name, date_of_birth, phone, address, church, avatar} = req.body
        let obj = {
            name, date_of_birth, phone, address, church, avatar
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
}
module.exports = Controllers