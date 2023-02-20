const {Users} = require("../models")
const jwt = require("jsonwebtoken")

//register
const register = async (req,res)=>{
    const user = req.body 
    console.log(user);
    await Users.create(user)
    res.json(" Register succes")
}

//login
const login = async (req,res) =>{
    Users.findOne({
        where:{
            email: req.body.email,
            password: req.body.password,
        },
    }).then((user) =>{
        if(!user){
            res.status(401).send("Invalid Email or Password")
        }else{
            const token = jwt.sign({id : user.id}, "jwtkey")
            res.cookie("unlock_token", token,{
                httpsOnly:true,            
            })
            .status(200)
            .json("Login success")
        }
    })   
}

//logout
const logout =  async (req, res)=>{
    res.clearCookie("unlock_token",{
        sameSite:"none",
        secure:true
    })
    .status(200)
    .json("User Logged Out")
}

module.exports = {register,login,logout}