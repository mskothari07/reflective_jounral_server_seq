const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()

app.use(express.json())
app.use(cookieParser())

const db = require('./models')

//Routers
const authRouter = require("./routes/auth.js")
app.use("/", authRouter)


const port = process.env.PORT || 8001

db.sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Up ${port}`);
    })
})


