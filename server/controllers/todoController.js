require("dotenv").config()
const {toDos, Users} = require("../models");
const helper = require("../helper/index")
// const axios = require("axios")

class Controller{

    static getTodos(req,res){
        toDos.findAll({
            include: [{
                model: Users,
                required: true
            }],
            // where: {
            //     userid: req.user.id
            // }
        })//req.user.id adalah token
        .then(data=>{
            // console.log(data,"---");
            const newData = data.map(data => {
                return {
                    ...data.dataValues,
                    User: {
                        ...data.dataValues.User.dataValues,
                        username: helper(data.dataValues.User.dataValues.username)
                    }
                }
            })
            // const newData = helper(data[0].User.username);
            res.status(200).json(newData)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static getTodoId(req,res){
        console.log("masuk get todo id");
        let id = req.params.id
        toDos.findOne({where:{id:id}})
        .then(data=>{
            res.status(200).json({data})
        })
        .catch(err=>{
            res.status(404).json({message:"data not found!!!"})
        })
    }

    static addTodo(req,res){
        let obj = {
            description : req.body.description,
            condition : req.body.condition,
            status:false,
            userid:req.user.id
        }
        console.log(req.user.id,"----id");
        toDos.create(obj)
        .then(data=>{
            res.status(201).json({data})
        })
        .catch(err=>{
            if(err.errors){
                let errData = [];
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

    static update(req,res){
        let id = req.params.id
        let newData={
            description:req.body.description,
            condition:req.body.condition,
            status:false
        }
        // console.log("update=========================",id,"---",newData);
        toDos.update(newData,{where:{id:id}})
        .then(data=>{
            if(data){
                res.status(200).json(newData)
            }
            else{
                res.status(404).json({
                    message:"data not updated / not found"
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

    static deleteToDo(req,res){
        let id = req.params.id;
        toDos.destroy({where:{id:id}})
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

    // static weather(req,res){
    //     axios({
    //         method:"GET",
    //         url:`https://api.openweathermap.org/data/2.5/weather?q=Jakarta,id&appid=${process.env.API_WEATHER}`
    //     })
    //         .then(function(response){
    //             // handle success
    //             res.status(200).json(response.data)
    //         })
    //         .catch(function(error){
    //             // handle error
    //             res.status(404).json(error)
    //         })
    // }

    // static calendar(req,res){
    //     axios({
    //         method:"GET",
    //         url:`https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_CALENDAR}&country=ID&year=2020`})
    //         .then(function(response){
    //             // handle success
    //             // console
    //             res.status(200).json(response.data)
    //         })
    //         .catch(function(error){
    //             // handle error
    //             res.status(404).json(error)
    //         })
    // }
}
module.exports=Controller;

