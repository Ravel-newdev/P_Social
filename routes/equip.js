const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Equip')
const Equips = mongoose.model("equip")

router.get('/add_equip', (req,res) =>{
    res.render('equip/add_equip')
})
router.post('/add_equip', (req, res)=>{
 const newEquips = {
    nome: req.body.nome,
    qnt_estoque: req.body.qnt_equip,
    status: req.body.status
 }

 new Equips(newEquips).save().then(() =>{
    req.flash('success_msg','Salvo com sucesso!')
    res.redirect('/')
}).catch((err) => {
   req.flash('error_msg','Houve um error ao salvar. ERROR: '+err)
   res.redirect('/')
})
})

module.exports = router