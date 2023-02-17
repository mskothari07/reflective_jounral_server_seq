const express = require("express")
const router = express.Router()
const {Blogs} = require("../models")
const jwt = require("jsonwebtoken")


//Home Page Getting all blogs
router.get("/", getallblog)
//Single Page i.e getting single blog
router.get("/:id",getblog)
//Adding a Blog
router.post("/",addblog)
//Delete Blog
router.delete("/:id", deleteblog)
//Update Blog
router.put("/:id",updateblog)