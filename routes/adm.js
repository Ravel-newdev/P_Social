const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//require('../model/Admin')
//const Admin = mongoose.model("admin")
//require('../model/User')
//const User = mongoose.model('user')

router.get('/choice', (req,res) => {
    res.render('adm/choice')
})

module.exports = router