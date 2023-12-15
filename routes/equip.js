const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Equip");
const Equips = mongoose.model("equip");
const checkToken = require('../middleware/checkToken')

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


router.post('/create' , checkToken,async(req,res)=>{

  //Validação primeira, verificando se campos estão ou não vazios
  let codigo = 0
  let sts = ''
  const {nome,qnt_estoque,status} = req.body
   //aqui fica a procura do cadastro, pra ver se ele existe
  // validação da entrada de dados
  

  if(!nome){
    res.status(422).json({msg:'Informe um equipamento valido'})
  }
  if(!qnt_estoque){
    res.status(422).json({msg: 'Você precisa informar uma quantidade valida'})
  }
  if(!status || status == 0){
    res.status(422).json({msg:' Informe o status atual do produto'})
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
     qnt_estoque == 0 ? sts = 'I' : sts = `${status}` //se a quantidade de estoque do produto for igual a zero, o seu status será setado automaticamente para inativo.
       const newEquips = {
        codigo: +codigo + +1,
        nome: nome.toUpperCase(),
        status: sts, //STATUS = A - ATIVO, STATUS = I - INATIVO, STATUS = D - DELETADO
        qnt_estoque:qnt_estoque
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
  const {nome,status,qnt_estoque} = req.body
  if(!nome){
      res.status(422).json({msg: "O nome é obrigatório"})
 }

 if(status == 0 || !status){
  res.status(422).json({msg: "Selecione um status antes de prosseguir!"})
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

          if (equipss.nome != nome.toUpperCase() || equipss.status != status || equipss.qnt_estoque != qnt_estoque ) {
                          // Faça as atualizações apenas se houver diferenças
                     qnt_estoque == 0 ? sts = 'I' : sts = `${status}` 
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
            res.status(404).json({msg:'Error ao atualizar os dados. ERROR: '+err})
          })
   }

}).catch((err)=>{
     res.status(404).json({msg:'Equipamento não encontrada.'})
  })
  }
})

  //deletando o equipamento
  router.put('/delete/:id',checkToken ,async(req,res)=>{ 
    await Equips.findOne({_id:req.params.id}).then(async()=>{
         const filter = { _id: req.params.id };
         const update = { $set: { D_E_L_E_T: '*',status:'D'
         , date_update: Date.now()}};
 
       await Equips.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
             res.status(200).json({msg:'Equipamento deletado com sucesso!'})
            }).catch((err)=>{
             res.status(404).json({msg:'Error ao deletar equipamento. ERROR: '+err})
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
