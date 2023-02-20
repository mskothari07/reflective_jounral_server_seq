const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const multer = require("multer")


app.use(express.json())
app.use(cookieParser())


const db = require('./models')


//Image Upload Using multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads")
    },
    filename: function(req, file,cb){
        cb(null, Date.now() + file.originalname)
    },
})
const upload = multer({storage})

app.post("/server/upload", upload.single("file"), function(eq,res){
    const file = req.file
    res.status(200).json(file.filename)
})



//Routers
const authRouter = require("./routes/auth.js")
app.use("/server/auth", authRouter)

const blogRouter = require("./routes/blog.js")
app.use("/server/blogs",blogRouter)


const port = process.env.PORT || 8001

db.sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Up ${port}`);
    })
})


