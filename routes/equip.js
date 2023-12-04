const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../model/New_Equipamento')
const Equip = mongoose.model("Equipamentos")

router.get('/login', (req,res) => {
    res.render('adm/login')
})
router.get('/about', (req,res) => {
    res.render('adm/index')
})
router.get('/login/choice', (req,res) => {
    res.render('adm/choice')
})
router.get('/login/choice/add_equip', (req,res) =>{
    res.render('adm/add_equip')
})
router.post('/login/choice/add_equip', (req, res)=>{
 const newEquip = {
    nome: req.body.nome,
    qnt_equip: req.body.qnt_equip
 }

 new Equip(newEquip).save().then(() =>{
    req.flash('success_msg','Salvo com sucesso!')
    res.redirect('/')
}).catch((err) => {
   req.flash('error_msg','Houve um error ao salvar. ERROR: '+err)
   res.redirect('/')
})
})

module.exports = router