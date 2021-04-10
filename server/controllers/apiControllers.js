const axios = require("axios");

class apiController{
     static weather(req,res){
        axios({
            method:"GET",
            url: "https://quotes.rest/qod"
        })
            .then(function(data){
                // handle success
                console.log(data.data.contents,"========");
                res.status(200).json(data.data.contents);
            })
            .catch(function(error){
                // handle error
                res.status(404).json(error)
            })
    }
}
module.exports = apiController;