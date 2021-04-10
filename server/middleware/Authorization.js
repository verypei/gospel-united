
const {toDos} = require('../models')

//authorization digunakan untuk mencari data todo yg user id nya sama dengan org yg sedang login

function authorization(req, res, next){
    
    let id = req.params.id
    toDos.findOne({
        where: {id:id}
    })
    .then(data => {
        if(!data){
            res.status(404).json({message:"data not found"})
        }
        else{
            if(data.userid===req.user.id){
                next()
            }
            else{
                res.status(400).json({message:"forbiden access in authorization"})
            }
        }
    })
    .catch(err=>{
        res.status(500).json(err.message)
    })
}

module.exports = authorization