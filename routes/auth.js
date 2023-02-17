const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const jwt = require("jsonwebtoken")

// router.get("/", (req,res)=>{
//     res.send("Hello World")
// })


//register api
router.post("/register", async (req,res) => {
    const user = req.body 
    console.log(user);
    await Users.create(user)
    res.json(" Register succes")
    alert ("User Registered Please login")
})

//login api
router.post("/login", async (req,res) =>{
    Users.findOne({
        where:{
            email: req.body.email,
            password: req.body.password,
        },
    }).then((user) =>{
        if(!user){
            res.status(401).send("Invalid Email or Password")
        }else{
            const token = jwt.sign({id : user.id}, "secretkey")
            res.cookie("unlock_token", token,{
                httpsOnly:true,            
            })
            .status(200)
            .json("Login success")
        }
    })   
})

//logout

module.exports = router