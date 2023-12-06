const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Salas')
const Salas = mongoose.model('salas')

router.get('/create', (req,res) => {
    Salas.findOne().sort({_id: -1}).lean().then((salass)=>{
    res.render('salas/criar_sala' , {salass:salass})
    })
})
router.post('/create' , (req,res)=>{
    
          const newSalas = {
            codigo: (+req.body.codigo + +1),
            nome: req.body.nome,
            status: req.body.status
         }

        new Salas(newSalas).save().then(() =>{
            req.flash('success_msg','Salvo com sucesso!')
            res.redirect('/')
        }).catch((err) => {
           req.flash('error_msg','Houve um error ao salvar. ERROR: '+err)
           res.redirect('/')
        })
    
     
})

module.exports = router