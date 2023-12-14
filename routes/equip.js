const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Equip')
const Equips = mongoose.model("equip")
const checkToken = require('../middleware/checkToken')

//cadastrando os equipamentos

router.post('/add_equip', checkToken,async (req,res)=>{

   const {code,name,qnt,status} = req.body

   if(!code){
      res.status(422).json({msg: "O código é obrigatório"})
   }
   if(!name){
      res.status(422).json({msg: "O nome é obrigatório"})
   }
   if(!qnt){
      res.status(422).json({msg: "A quantidade é obrigatória"})
   }
   if(!status){
      res.status(422).json({msg: "O status é obrigatório"})
   }

   const EquipExists = await Equips.findOne({name: name})

   if(EquipExists){
      res.status(422).json({msg: "Equipamento já existe"})
   }

   const equip = new Equips({
      name,
      code,
      qnt,
      status
   })

   equip.save()

   res.status(200).json({msg: "equipamento salvo com sucesso"})
})

   //listando os equipamentos

   router.get('/listEquip',checkToken, async(req,res)=>{
      Equips.find().then((equipamentos)=>{
         res.status(200).json(equipamentos)
      }).catch((err)=>{
         res.status(404).json({msg: "Not found"})
      })
})

//atualizando os equipamentos
router.put('/attEquip/:id',checkToken,async (req,res)=>{

      const Equip = await Equips.findByIdAndUpdate(req.params.id,{
          name: req.body.name,
          code: req.body.code,
          qnt: req.body.qnt,
          status: req.body.status
      })
      return res.send(Equip)
  })

  //deletando os equipamentos
  router.delete('/deleteEquip/:id', checkToken,async(req,res)=>{

   const Equip = await Equips.findByIdAndDelete(req.params.id)
   return res.send(Equip)
  })

module.exports = router