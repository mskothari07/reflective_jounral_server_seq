const {Blogs} = require("../models")
const jwt = require("jsonwebtoken")


//Fetching all Blogs

const getBlogs =  async (req,res)=>{
    try{
        const {cat} = req.query
        const where = cat ? {cat} :{}

        const blog = await Blogs.findAll({where})
        return res.json(blog)
    } catch (err){
        console.log(err);
        return res.status(500).send(err)
    }
}

//adding Blog

const addblog = async (req,res) =>{
    const token = req.cookies.unlock_token
    if(!token) return res.status(404).json("No token Found")

    try{
        const userInfo = jwt.verify(token, "jwtkey")
        const newBlog = await Blogs.create({
            title: req.body.title,
            desc:req.body.desc,
            img: req.body.img,
            cat:req.body.cat,
            date:req.body.date,
            userId: userInfo.id
        })
        return res.json("Blog added")
    }catch(err){
        if(err.name === 'JsonWebTokenError'){
            return res.status(404).json("Invalid Token")
        }
        return res.status(500).json(err)
    }
}

module.exports = {getBlogs,addblog}