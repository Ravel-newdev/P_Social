const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Equip')
const Equips = mongoose.model("equip")

router.get('/add_equip', (req,res) =>{
    res.render('equip/add_equip')
})
router.post('/add_equip', (req, res)=>{
   var erros = [] 

   if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null ||
      !req.body.qnt_estoque || typeof req.body.qnt_estoque == undefined || req.body.qnt_estoque == null){
       erros.push({texto: 'Digite o nome do equipamento.'})
  }
  if(req.body.status == 0){
   erros.push({texto:"Por favor, selecione um status antes de prosseguir."})
  }

  if(erros.length > 0){
      Equips.find().lean().then((equipaments)=>{
       res.render('equip/add_equip', {erros:erros , equipaments:equipaments})   
   }).catch((err)=>{
    req.flash('error_msg',"Houve um error ao carregar o formulário!, Error: "+err)
    res.redirect('/admin')
   })   
    
  }
else{

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
}
})

module.exports = router