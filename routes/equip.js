const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Equip");
const Equips = mongoose.model("equip");
require('../models/Reserva_Equip')
const R_Equip = mongoose.model('reserva_equip')
const checkToken = require('../middleware/checkToken')


//Consultas
router.post('/searchbycod',checkToken,async(req,res)=>{

  const {codigo} = req.body
  
  if(codigo){
  Equips.find({codigo: codigo, D_E_L_E_T: ''}).lean().then((equips)=>{
      if(equips){
      res.status(200).json(equips)
      }
      else{
      res.status(404).json({msg:'Nenhum dado encontrado'})
      }
  }).catch((err)=>{
      res.status(404).json({msg:`Not found. ERROR: ${err} `})
  })
  }
  
  else{
      res.status(422).json({msg:'Digite algum codigo.'})
  }
  
  })
  
  router.post('/searchbyname',checkToken,async(req,res)=>{
  
      const {nome} = req.body
      
      if(nome){
      Equips.find({nome: { $regex: `${nome.toUpperCase()}` }, D_E_L_E_T:''}).lean().then((equips)=>{
          if(equips){
          res.status(200).json(equips)
          }
          else{
          res.status(404).json({msg:'Nenhum dado encontrado'})
          }
      }).catch((err)=>{
          res.status(404).json({msg:`Not found. ERROR: ${err} `})
      })
      }
      
      else{
          res.status(422).json({msg:'Digite algum nome.'})
      }
      
      })
  
      router.post('/searchbystatus',checkToken,async(req,res)=>{
  
          const {status} = req.body
          
          if(status){
          Equips.find({status: status, D_E_L_E_T:''}).lean().then((equips)=>{
              if(equips){
              res.status(200).json(equips)
              }
              else{
              res.status(404).json({msg:'Nenhum dado encontrado'})
              }
          }).catch((err)=>{
              res.status(404).json({msg:`Not found. ERROR: ${err} `})
          })
          }
          
          else{
              res.status(422).json({msg:'Digite algum status.'})
          }
          
          })

          //Visualização

router.get("/view", checkToken, async (req,res) =>{
await Equips.find({D_E_L_E_T:''}).lean().then((equips)=>{
  res.status(200).json(equips)
}).catch((err)=>{
  res.status(404).json({msg:'Não foi encontrado nenhum registro no banco'})
})
});

router.get("/view_delete", checkToken,async (req,res) =>{
  await Equips.find({D_E_L_E_T:'*'}).lean().then((equips)=>{
    res.status(200).json(equips)
  }).catch((err)=>{
    res.status(404).json({msg:'Não foi encontrado nenhum registro no banco'})
  })
  });

//METODOS CREATE, UPDATE E DELETE

router.post('/create' , checkToken,async(req,res)=>{

  //Validação primeira, verificando se campos estão ou não vazios
  let codigo = 0
  const {nome,qnt_estoque,status} = req.body
   //aqui fica a procura do cadastro, pra ver se ele existe
  // validação da entrada de dados
  

  if(!nome){
    res.status(422).json({msg:'Informe um equipamento valido'})
  }
  if(!qnt_estoque){
    res.status(422).json({msg: 'Você precisa informar uma quantidade valida'})
  }

else{
  //Validação secundária, compara o valor recebido com o existente ao banco de dados para evitar duplicação dos dados.

 await Equips.findOne({nome:nome.toUpperCase(), D_E_L_E_T:''}).lean().then((exists)=>{
   if(exists){
       res.status(404).json({msg:'Nome já existe.'})
   }

   else{

  Equips.findOne().sort({_id: -1}).lean().then((equipss)=>{    
     equipss ? codigo = equipss.codigo : codigo = 0
       const newEquips = {
        codigo: +codigo + +1,
        nome: nome.toUpperCase(),
        qnt_estoque
     }

      new Equips(newEquips).save().then(() =>{
          res.status(200).json({msg:'Salvo com sucesso'})
      }).catch((err) => {
         res.status(404).json({msg:'Error ao salvar.'+err})
      })
  }).catch((err)=>{
      res.status(404).json({msg:'Error na consulta.'})
  })

   }
  }).catch((err)=>{
      res.status(404).json({msg:'Houve um error ao validar os dados.'})
  })
  }
})



    ;
//listar TODOS os equipamentos, o metodo findOne não será usado para pesquisa de equipamentos

//o update_equip é para atualizar/editar equipamentos (que surprendente),
router.put('/update/:id',checkToken ,async(req,res)=>{

  let sts = ''
  const {nome,qnt_estoque} = req.body
  if(!nome){
      res.status(422).json({msg: "O nome é obrigatório"})
 }
 if(!qnt_estoque){
  res.status(422).json({msg: "A quantidade do estoque é obrigatória"})
 }

  else{
     await Equips.findOne({_id: {$ne: `${req.params.id}`}, nome: nome.toUpperCase(), D_E_L_E_T:''}).lean().then((exists)=>{
       if(exists){       
                res.status(404).json({msg:'Nome já está registrado no banco.'})
          
                  }

   else{
       Equips.findOne({_id: req.params.id}).then(async(equipss)=>{

          if (equipss.nome != nome.toUpperCase() || equipss.qnt_estoque != qnt_estoque ) {
                          // Faça as atualizações apenas se houver diferenças
                     const filter = { _id: req.params.id };
                          const update = { $set: { nome: nome.toUpperCase(), status: sts ,
                         qnt_estoque: qnt_estoque , date_update: Date.now()}};
                          
                         await Equips.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
                               res.status(200).json({msg:'Equipamento atualizado com sucesso!'})
                              }).catch((err) => {
                               res.status(404).json({msg:'Error ao atualizar equipamento!'})
                              })
/*                                salass.nome =  nome.toUpperCase()
                              salass.status =  status
                              salass.date_update = Date.now()
  
                              salass.save().then(()=>{
                                  
                                  req.flash('success_msg','Sala atualizada com sucesso!')
                                  res.redirect('/salas/view')
                          }).catch((err)=>{
                              req.flash('error_msg','Não foi possivel atualizar a sala'+err)
                          })
                      */

                             ;
                  } 
                  
                  else {
                          // Nenhum dado foi alterado, redirecione com uma mensagem
                          res.status(404).json({msg:'Nenhuma alteração feita nos dados!'})
                      }
         
          }).catch((err)=>{
            res.status(404).json({msg:'Error ao atualizar os dados.'})
            console.log(err)
          })
   }

}).catch((err)=>{
     res.status(404).json({msg:'Equipamento não encontrada.'})
     console.log(err)
  })
  }
})

  //deletando o equipamento
  router.put('/delete/:id',checkToken ,async(req,res)=>{ 
  
    
   await Equips.findOne({_id:req.params.id}).then(async(equips)=>{         
    R_Equip.find({cod_equip:equips.codigo , D_E_L_E_T: ''}).lean().then(()=>{
 
     const filter = { cod_equip: equips.codigo};
     const update = { $set: { D_E_L_E_T: '*', date_update: Date.now()}};
 
        R_Equip.updateMany(filter, update, { new: true }).then(async() =>{
         const filter = { _id: req.params.id };
         const update = { $set: { D_E_L_E_T: '*',status:'D'
         , date_update: Date.now()}};
   
       await Equips.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
             res.status(200).json({msg:'Equipamento deletado com sucesso!'})
            }).catch((err)=>{
             res.status(404).json({msg:'Error ao deletar equipamento. ERROR: '+err})
            })
    }).catch((err)=>{
     res.status(404).json({msg:'Reserva de Equipamentos não encontrada.'})
    })
        }).catch((err)=>{
         res.status(404).json({msg:'Error ao deletar reservas do equipamento. ERROR: '+err})
        })
 }).catch((err)=>{
 res.status(404).json({msg:'Equipamento não encontrado.'})
 })
 })


 //DISCLAMER - DELETE SO PODE SER USADO POR DESENVOLVEDORES EM AMBIENTE DE TESTE.
 /*
  router.delete('/delete_everything',checkToken ,async(req,res)=>{
    await Equips.deleteMany({}).then(()=>{
     res.status(200).json({msg:'Deletado com sucesso!'})
    }).catch((err)=>{
        res.status(404).json({msg:'Não foi possivel deletar'})
    })
})
*/

   

module.exports = router;
