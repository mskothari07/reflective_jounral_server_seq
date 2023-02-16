const express = require("express")
const app = express()

const db =require('./models')


const PORT = process.env.PORT

db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is Up");
    })
})


