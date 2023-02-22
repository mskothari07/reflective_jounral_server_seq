const { Blogs } = require("../models");
const jwt = require("jsonwebtoken");


//Fetching all Blogs
const getBlogs = async (req, res) => {
  try {
    const { cat } = req.query;
    const where = cat ? { cat } : {};

    const blog = await Blogs.findAll({ where });
    return res.json(blog);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

//adding Blog
const addblog = async (req, res) => {
  const token = req.cookies.unlock_token;
  if (!token) return res.status(404).json("No token Found");

  try {
    const userInfo = jwt.verify(token, "jwtkey");
    const newBlog = await Blogs.create({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      cat: req.body.cat,
      date: req.body.date,
      userid: userInfo.id,
    });
    return res.json("Blog added");
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(404).json("Invalid Token");
    }
    return res.status(500).json(err);
  }
};

//getting single blog
const getBlog = async (req, res) => {
  try {
    const blog = await Blogs.findOne({
      where: { id: req.params.id },
      include: [User],
    });
    res.json(blog);
  } catch (err) {
    res.json(500).send(err.message);
  }
};

//update blog
const updateBlog = async(req,res) =>{
    const token = req.cookies.unlock_token
    if(!token) return res.status(401).json("No token FOund")

    try{
        const userInfo = jwt.verify(token, "jwtkey")
        const blogId = req.params.id

        const updatedBlog = await Blogs.update(
            {
                title:req.body.title,
                desc:req.body.desc,
                img:req.body.img,
                cat:req.body.cat,
            },
            {
                where :{
                    id : blogId,
                    userid: userInfo.id
                }
            }
        )
        if (updatedBlog[0] === 0){
            return res.status(404).json("Blog not found or unauthorized")
        }
        return res.json('blog updated')
    } catch (err){
        return res.status(500).json(err)
    }
}


//Deleting Blog
const deleteBlog = (req,res) =>{
    //Token extract from cookies

    const token = req.cookies.unlock_token
    if(!token) {
        res.status(401).json("No token")
    }

    //token verfication and getting userinfo
    jwt.verify(token, 'jwtkey', (err,userInfo) =>{
        if (err) {
            return res.status(404).json('Invalid token')
        }


    //Finding blog to delete
    const blogId = req.params.id
    Blogs.findOne({
        where:{
            id : blogId,
            userid : userInfo.id
        },
    })
        .then((Blogs) =>{
            if(!Blogs){
                return res.status(404).json('you do have access to delete it')
            }

            //Delete the blog
            Blogs.destroy().then(()=>{
                return res.json('DELETED')
            })
        })
        .catch((err)=>{
            return res.status(500).json('Some Error occcured')
        })
    })
} 



module.exports = { getBlogs, addblog, getBlog, updateBlog, deleteBlog };
