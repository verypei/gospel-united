require("dotenv").config;
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const router = require("./routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",router);
app.listen(PORT,()=>{
    console.log(`listening to this port ${PORT}`);
})