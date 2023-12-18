const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Reserva_Equip')
const R_Equip = mongoose.model('reserva_equip')
require('../models/Equip')
const Equips = mongoose.model('equip')

const checkToken = require('../middleware/checkToken')

//ver todas as reservas não deletadas
router.get('/view',checkToken, async(req,res) =>{
    R_Equip.find({D_E_L_E_T:''}).lean().then((R_Equips)=>{
        res.status(200).json(R_Equips)
    }).catch((err)=>{
        res.status(404).json({msg: `Not found. ERROR: ${err}`})
    })
    })
    
    //ver as reservas deletadas
    router.get('/view_delete',checkToken, async(req,res) =>{
        R_Equip.find({D_E_L_E_T:'*'}).lean().then((R_Equips)=>{
            res.status(200).json(R_Equips)
        }).catch((err)=>{
            res.status(404).json({msg: `Not found. ERROR: ${err}`})
        })
        })

        //Registro da reserva de equipamentos
        
    router.post('/create' ,checkToken, async(req,res)=>{

            //Validação primária, verificando se campos estão ou não vazios
            let cod_reserva = 0
        
            const {cod_user,cod_equip,desc,qnt_equip,date_reserv,date_entrega,hora_reserva,hora_entrega} = req.body
            if(!cod_user){
                res.status(422).json({msg: "Digite o nome do usuário que irá reserva."})
             }

           if(!cod_equip){
            res.status(422).json({msg: "O equipamento é obrigatório"})
             }

        if(!qnt_equip || qnt_equip == 0){
          res.status(422).json({msg:'A quantidade de equipamento é obrigatória'})
}
           if(!date_reserv){
        res.status(422).json({msg: "A data da reserva é obrigatória"})
             }

           if(!date_entrega){
                res.status(422).json({msg: "A data da entrega é obrigatória"})
                     }
           if(!hora_reserva){
                        res.status(422).json({msg: "A hora da reserva é obrigatória"})
                    }

         if(!hora_entrega){
                        res.status(422).json({msg: "A hora da entrega é obrigatória"})
                             }
                    
                
        else{
            //Validação secundária, compara o valor recebido com o existente ao banco de dados para evitar duplicação dos dados.
        
            R_Equip.find(
              {
                  cod_equip: cod_equip,
                  $or: [
                    { date_reserv: date_reserv },
                    { date_reserv: date_entrega }
                  ],
                  $or: [
                    { date_entrega: date_reserv },
                    { date_entrega: date_entrega }
                  ],
                  hora_reserva: hora_reserva,
                  hora_entrega: hora_entrega,
                  D_E_L_E_T: ''
              }).lean().then((exists)=>{
                //Verificando se o equipamento digitado existe ou não no sistema.
             let sum = 0
             exists.forEach(function (doc) {
              sum += doc.qnt_equip;
            })
  
                //Verificando se o equipamento digitado existe ou não no sistema.
              Equips.findOne({codigo: cod_equip, D_E_L_E_T:''}).lean().then((equips)=>{
                  soma = +qnt_equip + +sum    
                
                  if(equips.qnt_estoque < soma){
                    res.status(400).json({msg:`Equipamento não pode mais ser reservado, escolha outro horário`})
                  }

                  else {
                                
                    if(equips.qnt_estoque == 0){
                      res.status(400).json({msg:'O equipamento se encontra inativo (fora de estoque).'})
                    }

                    if(equips.qnt_estoque < qnt_equip){
                      res.status(401).json({msg:'A quantidade de pedida é maior que a quantidade em estoque.'})
                      }
                 
                 if(equips){
                    R_Equip.findOne().sort({_id: -1}).lean().then((u_R_Equips)=>{
                        u_R_Equips ? cod_reserva = u_R_Equips.cod_reserva : cod_reserva = 0
                        const newR_Equip = {
                           cod_reserva: +cod_reserva + +1,
                           cod_user:cod_user,
                           cod_equip: cod_equip,
                           qnt_equip:qnt_equip,
                           desc: desc,
                           date_reserv: date_reserv,
                           date_entrega: date_entrega,
                           hora_reserva: hora_reserva,
                           hora_entrega: hora_entrega
                           
                        }
               
                       new R_Equip(newR_Equip).save().then(() =>{
                           res.status(200).json({msg:`Salvo com sucesso ${sum}`})
                       }).catch((err) => {
                          res.status(500).json({msg:'Error ao salvar.'+err})
                       })
                   }).catch((err)=>{
                       res.status(404).json({msg:'Error na consulta.'})
                   })
               
                 }

                 else{
                 res.status(404).json({msg:'Sala não encontrada.'})
                 }
                }
                })
           
           
            }).catch((err)=>{
                res.status(422).json({msg:'Houve um error ao validar os dados.'})
            })
            }
        })

        //Atualização dos dados da reserva de equips
        router.put('/update/:id', checkToken,async(req,res)=>{
                const {cod_user,cod_equip,desc,qnt_equip,date_reserv,date_entrega,hora_reserva,hora_entrega} = req.body
                //Validações iniciais para que a reserva seja feita
                if(!cod_user){
                    res.status(422).json({msg: "Digite o nome do usuário que irá reserva."})
                 }

               if(!cod_equip){
                res.status(422).json({msg: "A sala é obrigatória"})
                 }

                 if(!qnt_equip || qnt_equip == 0){
                    res.status(422).json({msg:'A quantidade de equipamento é obrigatória'})
          }
    
               if(!date_reserv){
            res.status(422).json({msg: "A data da reserva é obrigatória"})
                 }
    
               if(!date_entrega){
                    res.status(422).json({msg: "A data da entrega é obrigatória"})
                         }

               if(!hora_reserva){
                            res.status(422).json({msg: "A hora da reserva é obrigatória"})
                        }
    
             if(!hora_entrega){
                            res.status(422).json({msg: "A hora da entrega é obrigatória"})
                                 }
                        
                else{
    
                  R_Equip.find(
                    {
                        cod_equip: cod_equip,
                        $or: [
                          { date_reserv: date_reserv },
                          { date_reserv: date_entrega }
                        ],
                        $or: [
                          { date_entrega: date_reserv },
                          { date_entrega: date_entrega }
                        ],
                        hora_reserva: hora_reserva,
                        hora_entrega: hora_entrega,
                        D_E_L_E_T: ''
                    }).lean().then((exists)=>{
                      //Verificando se o equipamento digitado existe ou não no sistema.
                   let sum = 0
                   exists.forEach(function (doc) {
                    sum += doc.qnt_equip;
                  })
        
                      //Verificando se o equipamento digitado existe ou não no sistema.
                    Equips.findOne({codigo: cod_equip, D_E_L_E_T:''}).lean().then((equips)=>{
                        soma = +qnt_equip + +sum    
                      
                        if(equips.qnt_estoque < soma){
                          res.status(400).json({msg:`Equipamento não pode mais ser reservado, escolha outro horário`})
                        }
                        
                  else {
                    
                    if(equips.qnt_estoque == 0){
                      res.status(400).json({msg:'O equipamento se encontra inativo (fora de estoque).'})
                    }

                    if(equips.qnt_estoque < qnt_equip){
                      res.status(401).json({msg:'A quantidade de pedida é maior que a quantidade em estoque.'})
                      }
      
                        if(equips){

                          
                            R_Equip.findOne({_id: req.params.id}).then(async(R_Equips)=>{
                              
                                  
                                if (
                                    R_Equips.cod_user != cod_user ||
                                    R_Equips.cod_equip != cod_equip ||
                                    R_Equips.desc != desc ||
                                    R_Equips.qnt_equip != qnt_equip||
                                    R_Equips.date_reserv != date_reserv ||
                                    R_Equips.date_entrega != date_entrega ||
                                    R_Equips.hora_reserva != hora_reserva ||
                                    R_Equips.hora_entrega != hora_entrega
                                  ) {
                                    // Faça as atualizações apenas se houver diferenças
                                    const filter = { _id: req.params.id };
                                    const update = {
                                      $set: {
                                        cod_user: cod_user,
                                        cod_equip: cod_equip,
                                        desc: desc,
                                        qnt_equip: qnt_equip,
                                        date_reserv: date_reserv,
                                        date_entrega: date_entrega,
                                        hora_reserva: hora_reserva,
                                        hora_entrega: hora_entrega,
                                        date_update: Date.now(),
                                      },
                                    };
                                  
                                    await R_Equip.findByIdAndUpdate(filter, update, { new: true })
                                      .then(() => {
                                        res.status(200).json({ msg: 'Reserva de Equipamento atualizada com sucesso!' });
                                      })
                                      .catch((err) => {
                                        res.status(400).json({ msg: 'Erro ao atualizar reserva!' });
                                      });
                                  } else {
                                    // Nenhum dado foi alterado, redirecione com uma mensagem
                                    res.status(404).json({ msg: 'Nenhuma alteração feita nos dados!' });
                                  }
                                  
                                }).catch((err)=>{
                                  res.status(404).json({msg:'Error ao atualizar os dados. ERROR: '+err})
                                })
                        }
                        else{
                         res.status(404).json({msg:'Equipamento não encontrado ou fora de estoque.'})
                        }
                      }
                    }).catch((err)=>{
                        res.status(400).json({msg:'Erro ao consultar o equipamento!'})
                    })
                 
            
            }).catch((err)=>{
                   res.status(404).json({msg:'Reserva de Equipamento não encontrada.'})
                })
                }
           
        })

        router.put('/delete/:id',checkToken, async(req,res)=>{
            await R_Equip.findOne({_id:req.params.id}).then(async()=>{
                const filter = { _id: req.params.id };
                const update = { $set: { D_E_L_E_T: '*', date_update: Date.now()}};
        
              await R_Equip.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
                    res.status(200).json({msg:'Reserva de Equipamento deletada com sucesso!'})
                   }).catch((err)=>{
                    res.status(404).json({msg:'Error ao deletar reserva (equipamento). ERROR: '+err})
                   })
           }).catch((err)=>{
            res.status(404).json({msg:'Equipamento não encontrado.'})
           })
        })

// DISCLAMER: APENAS DESENVOLVEDORES EM AMBIENTE DE TESTE PODEM UTILIZAR ESTAS ROTAS.

        router.delete('/delete_total/:id', async(req,res)=>{
          await R_Equip.deleteOne({_id: req.params.id}).then(()=>{
            res.status(200).json({msg:'Deletado totalmente.'})
            }).catch((err)=>{
            res.status(400).json({msg:'Falha ao deletar'})
            
           })
        })

        
router.delete('/delete_everything',async(req,res)=>{
    await R_Equip.deleteMany({}).then(()=>{
     res.status(200).json({msg:'Deletado com sucesso!'})
    }).catch((err)=>{
        res.status(400).json({msg:'Não foi possivel deletar'})
    })
})



module.exports = router