const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Reserva_Salas')
const R_Salas = mongoose.model('reserva_salas')
require('../models/Salas')
const Salas = mongoose.model('salas')

const checkToken = require('../middleware/checkToken')

//ver todas as reservas não deletadas
router.get('/view',checkToken, async(req,res) =>{
    R_Salas.find({D_E_L_E_T:''}).lean().then((r_salass)=>{
        res.status(200).json(r_salass)
    }).catch((err)=>{
        res.status(404).json({msg: `Not found. ERROR: ${err}`})
    })
    })
    
    //ver as reservas deletadas
    router.get('/view_delete',checkToken, async(req,res) =>{
        R_Salas.find({D_E_L_E_T:'*'}).lean().then((r_salass)=>{
            res.status(200).json(r_salass)
        }).catch((err)=>{
            res.status(404).json({msg: `Not found. ERROR: ${err}`})
        })
        })

        //Registro da reserva de salas
    router.post('/create' ,checkToken, async(req,res)=>{

            //Validação primária, verificando se campos estão ou não vazios
            let cod_reserva = 0
        
            const {cod_user,cod_sala,desc,date_reserv,date_entrega,hora_reserva,hora_entrega} = req.body
            if(!cod_user){
                res.status(422).json({msg: "Digite o nome do usuário que irá reserva."})
             }
           if(!cod_sala){
            res.status(422).json({msg: "A sala é obrigatória"})
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
        
           R_Salas.findOne({
            cod_sala: cod_sala,
            $or: [
                {date_reserv: date_reserv},
                {date_reserv: date_entrega}
              ],

            $or: [
                {date_entrega: date_reserv},
                {date_entrega: date_entrega}
              ],
             hora_reserva:hora_reserva,
             hora_entrega:hora_entrega,

               D_E_L_E_T: '',
          
          }
          ).lean().then((exists)=>{
             
                if(exists){
                 res.status(409).json({msg:'A sala já está reservada'})
             }
        
             else{
                //Verificando se a sala digitada existe ou não no sistema.
              Salas.findOne({codigo: cod_sala, D_E_L_E_T:''}).lean().then((salas)=>{
                 if(salas){

                  //Vê a ultima reserva de sala para gerar o codigo
                    R_Salas.findOne().sort({_id: -1}).lean().then((u_r_salass)=>{
                        u_r_salass ? cod_reserva = u_r_salass.cod_reserva : cod_reserva = 0
                        const newR_Salas = {
                           cod_reserva: +cod_reserva + +1,
                           cod_user:cod_user,
                           cod_sala: cod_sala,
                           desc: desc,
                           date_reserv: date_reserv,
                           date_entrega: date_entrega,
                           hora_reserva: hora_reserva,
                           hora_entrega: hora_entrega
                           
                        }
               
                       new R_Salas(newR_Salas).save().then(() =>{
                           res.status(200).json({msg:'Salvo com sucesso'})
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
              })
           
             }
            }).catch((err)=>{
                res.status(422).json({msg:'Houve um error ao validar os dados.'})
            })
            }
        })

        //Atualização dos dados da reserva de salas
        router.put('/update/:id', checkToken,async(req,res)=>{
                const {cod_user,cod_sala,desc,date_reserv,date_entrega,hora_reserva,hora_entrega} = req.body

                if(!cod_user){
                    res.status(422).json({msg: "Digite o nome do usuário que irá reserva."})
                 }
               if(!cod_sala){
                res.status(422).json({msg: "A sala é obrigatória"})
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
    
                    R_Salas.findOne({_id: {$ne: `${req.params.id}`},
                        cod_sala: cod_sala,
                        $or: [
                            {date_reserv: date_reserv},
                            {date_reserv: date_entrega}
                          ],
            
                        $or: [
                            {date_entrega: date_reserv},
                            {date_entrega: date_entrega}
                          ],
                         hora_reserva:hora_reserva,
                         hora_entrega:hora_entrega,
            
                           D_E_L_E_T: '',
                      
                      }
                      ).lean().then((exists)=>{
                         
                            if(exists){
                             res.status(409).json({msg:'A sala já está reservada'})
                         }
            
                 else{
                  //Encontra uma sala que nao esteja deletada para verificar se ela existe.
                    Salas.findOne({codigo: cod_sala, D_E_L_E_T:''}).lean().then((salas)=>{
                        if(salas){
                          
                          //Se existir ele tenta encontrar uma reserva com aquele mesmo codigo para que a atualização possa ocorrer com sucesso.
                            R_Salas.findOne({_id: req.params.id}).then(async(r_salass)=>{
            
                                if (
                                    r_salass.cod_user != cod_user ||
                                    r_salass.cod_sala != cod_sala ||
                                    r_salass.desc != desc ||
                                    r_salass.date_reserv != date_reserv ||
                                    r_salass.date_entrega != date_entrega ||
                                    r_salass.hora_reserva != hora_reserva ||
                                    r_salass.hora_entrega != hora_entrega
                                  ) {
                                    // Faça as atualizações apenas se houver diferenças
                                    const filter = { _id: req.params.id };
                                    const update = {
                                      $set: {
                                        cod_user: cod_user,
                                        cod_sala: cod_sala,
                                        desc: desc,
                                        date_reserv: date_reserv,
                                        date_entrega: date_entrega,
                                        hora_reserva: hora_reserva,
                                        hora_entrega: hora_entrega,
                                        date_update: Date.now(),
                                      },
                                    };
                                  
                                    await R_Salas.findByIdAndUpdate(filter, update, { new: true })
                                      .then(() => {
                                        res.status(200).json({ msg: 'Reserva de Sala atualizada com sucesso!' });
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
                         res.status(404).json({msg:'Sala não encontrada'})
                        }
                    }).catch((err)=>{
                        res.status(400).json({msg:'Erro ao consultar a sala!'})
                    })
                 }
            
            }).catch((err)=>{
                   res.status(404).json({msg:'Reserva de Sala não encontrada.'})
                })
                }
           
        })

        router.put('/delete/:id',checkToken, async(req,res)=>{
            await R_Salas.findOne({_id:req.params.id}).then(async()=>{
                const filter = { _id: req.params.id };
                const update = { $set: { D_E_L_E_T: '*', date_update: Date.now()}};
        
              await R_Salas.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
                    res.status(200).json({msg:'Reserva de Sala deletada com sucesso!'})
                   }).catch((err)=>{
                    res.status(404).json({msg:'Error ao deletar reserva (sala). ERROR: '+err})
                   })
           }).catch((err)=>{
            res.status(404).json({msg:'Sala não encontrada.'})
           })
        })

// DISCLAMER: APENAS DESENVOLVEDORES EM AMBIENTE DE TESTE PODEM UTILIZAR ESTAS ROTAS.

       /* router.delete('/delete_total/:id', async(req,res)=>{
          await R_Salas.deleteOne({_id: req.params.id}).then(()=>{
            res.status(200).json({msg:'Deletado totalmente.'})
            }).catch((err)=>{
            res.status(400).json({msg:'Falha ao deletar'})
            
           })
        })

        
router.delete('/delete_everything',async(req,res)=>{
    await R_Salas.deleteMany({}).then(()=>{
     res.status(200).json({msg:'Deletado com sucesso!'})
    }).catch((err)=>{
        res.status(400).json({msg:'Não foi possivel deletar'})
    })
})

*/

module.exports = router