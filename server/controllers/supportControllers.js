const {Prays,Users,Supports} = require("../models");

class supportControllers{
    
    static addSupport(req, res){
        // dapatkan id = req.params.id
        let id = req.params.id;
        Prays.increment('support',{by:1,where:{id}})
        .then(resp=>{
            let newData = resp[0][0][0];
            res.status(201).json(newData);
        })
        .catch(err=>{
            res.status(500).json(err);
        })

        let obj = {
            pray_id:id,
            user_id:req.user.id
        }

        Supports.create(obj)
        .then(data=>{
            console.log(data,"---->>>?????");
            res.status(201).json(data);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    }
    
    static lessSupport(req, res){
        let id = req.params.id
        Prays.decrement('support', {by:1,where: {id}})
        .then(resp=>{
            let newData = resp[0][0][0]

            Supports.destroy({where:{pray_id:id}})
            .then(data=>{
                res.status(201).json(data);
            })
            .catch(err=>{
                res.status(500).json(err);
            })

            res.status(201).json(newData);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    }

}
module.exports=supportControllers;