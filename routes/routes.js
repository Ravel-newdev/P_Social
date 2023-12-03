const express = require('express')
const routes = express.Router()
const mongoose = require('mongoose')

require('../model/New_Equipamento')
const add_equip = mongoose.model("Equipamentos")
routes.get('/', (req,res, next) => {
    //res.send('aqui é a central')
    res.render('layouts/main', {layout: false});
})
routes.get('/login', (req,res) => {
    res.render('adm/login')
})
routes.get('/about', (req,res) => {
    res.render('adm/index')
})
routes.get('/login/choice', (req,res) => {
    res.render('adm/choice')
})
routes.get('/login/choice/add_equip', (req,res) =>{
    res.render('adm/add_equip')
})
routes.post('/adm/choice/New_Equipamento', (req, res)=>{
 const novo_equip = {
    nome: req.body.nome,
    qnt_equip: req.body.qnt_equip,
    status_equip: req.body.status_equip,
    data_cad: req.body.data_cad,
    data_upt: req.body.data_upt,
    D_E_L_E_T: req.body.D_E_L_E_T
 }
    console.log(req.body)
    res.send('Enviados com sucesso!')

 new add_equip(novo_equip).save().then(() =>{
    console.log('Funcionou')
}).catch((err) => {
   console.log('N pegou', err)
})
})

module.exports = routes