const express = require("express")
const router = express.Router()

const {getBlogs,addblog,getBlog, updateBlog, deleteBlog} = require("../controllers/blog.js")

//Home Page Getting all blogs
router.get("/", getBlogs)

//Single Page i.e getting single blog
router.get("/:id",getBlog)

//Adding a Blog
router.post("/",addblog)

//Delete Blog
router.delete("/:id", deleteBlog)

//Update Blog
router.put("/:id",updateBlog)

module.exports = router ;