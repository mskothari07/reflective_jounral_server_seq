const express = require("express")
const router = express.Router()
const {Users} = require("../models")

// router.get("/", (req,res)=>{
//     res.send("Hello World")
// })

router.post("/register", async (req,res) => {
    const user = req.body
    console.log(user);
    await Users.create(user)
    res.json(" Register succes")
})

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
            res.json("Login Succes")
        }
    })   
})




module.exports = router