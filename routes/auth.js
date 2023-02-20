const express = require("express")
const router = express.Router()

const {register, login, logout} = require("../controllers/auth.js")


//register api
router.post("/register", register)
//login api
router.post("/login",login)
//logout
router.post("/logout", logout)

module.exports = router