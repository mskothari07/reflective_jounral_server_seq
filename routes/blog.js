const express = require("express")
const router = express.Router()

const {getBlogs,addblog,getBlog} = require("../controllers/blog.js")

//Home Page Getting all blogs
router.get("/", getBlogs)


// //Single Page i.e getting single blog
router.get("/:id",getBlog)

// //Adding a Blog
router.post("/",addblog)

// //Delete Blog
// router.delete("/:id", deleteblog)

// //Update Blog
// router.put("/:id",updateblog)

module.exports = router ;