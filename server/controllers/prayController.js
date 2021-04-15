require("dotenv").config()
const {Prays, Users} = require("../models");
const getAllPrayHelper = require("../helper/getAllPrayHelper")
// const axios = require("axios")

class Controller{

    static getPrays(req,res){
        console.log(req.user.id,"masuk ke get prays =====>");
        Prays.findAll({
            include: [{
                model: Users,
                required: true
            }],
            // where: {
            //     user_id: req.user.id
            // }
        })
        .then(data=>{
            // const newData = getAllPrayHelper(data);
            // console.log(newData,"--data from get prays");
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err,"--from get all pray--");
            res.status(500).json(err);
        })
    }

    static getPrayById(req,res){
        console.log("masuk get pray id");
        let id = req.params.id;
        Prays.findOne({where:{id:id}})
        .then(data=>{
            res.status(200).json({id:data.id,pray:data.pray})
        })
        .catch(err=>{
            res.status(404).json({message:"data not found!!!"})
        })
    }

    static addPray(req,res){
        let obj = {
            pray:req.body.pray,
            user_id:req.user.id
        }
        console.log(obj);
        let userName = ""
        Users.findOne({where:{id:req.user.id}})
        .then(dataUser=>{
            userName = dataUser.user_name
            console.log(userName,"from add pray in controllers");
        })
        .catch(err=>{
            console.log(err,"from add pray in controllers");
        })
        Prays.create(obj)
        .then(data=>{
            
            const newData = {
                id : data.id,
                pray : data.pray,
                user_name : userName
            }
            res.status(201).json(newData)
        })
        .catch(err=>{
            if(err.errors){
                res.status(400).json(errData)
            }
            else{
                res.status(500).json(err)
            }

        })
    }

    static updatePray(req,res){
        let id = req.params.id
        console.log(req.body,"-----controller");
        let newData={
            pray : req.body.pray
        }
        console.log(req.user.id,"update=========================",id,"---",newData);
        Prays.update(newData,{where:{id:id}})
        .then(resp=>{
            if(resp){
                console.log(resp,'in controller edit');
                res.status(200).json(resp)
            }
            else{
                res.status(404).json({
                    message:"data can't be updated / not found"
                })
            }
        })
        .catch(err=>{
            if(err.errors){
                let errData= [];
                for(let i=0;i<err.errors.length;i++){
                    errData.push({message:err.errors[i].message})
                }
                res.status(400).json(errData)
            }
            else{
                res.status(500).json(err)
            }

        })
    }

    static deletePray(req,res){
        let id = req.params.id;
        Prays.destroy({where:{id:id}})
        .then(data=>{
            if(data){
                res.status(201).json({message:"Data has been removed"})
            }
            else{
                res.status(404).json({message:"error data not found"})
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}
module.exports=Controller;