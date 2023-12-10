const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Salas')
const Salas = mongoose.model('salas')


router.get('/view', async(req,res) =>{
Salas.find({D_E_L_E_T:''}).lean().then((salass)=>{
    res.status(200).json(salass)
}).catch((err)=>{
    res.status(404).json({msg: `Not found. ERROR: ${err}`})
})
})

router.get('/view_delete', async(req,res) =>{
    Salas.find({D_E_L_E_T:'*'}).lean().then((salass)=>{
        res.status(200).json(salass)
    }).catch((err)=>{
        res.status(404).json({msg: `Not found. ERROR: ${err}`})
    })
    })
    

router.post('/create' , async(req,res)=>{

    //Validação primeira, verificando se campos estão ou não vazios
    let codigo = 0

    const {nome,status} = req.body

    if(!nome){
        res.status(422).json({msg: "O nome é obrigatório"})
   }

   if(status == 0 || !status){
    res.status(422).json({msg: "Selecione um status antes de prosseguir!"})
   }

else{
    //Validação secundária, compara o valor recebido com o existente ao banco de dados para evitar duplicação dos dados.
    
    Salas.findOne({nome:nome.toUpperCase(), D_E_L_E_T:''}).lean().then((name)=>{
     if(name){
         res.status(404).json({msg:'Nome já existe.'})
     }

     else{
        Salas.findOne().sort({_id: -1}).lean().then((u_salass)=>{
         u_salass ? codigo = u_salass.codigo : codigo = 0
         const newSalas = {
            codigo: +codigo + +1,
            nome: nome.toUpperCase(),
            status: status
         }

        new Salas(newSalas).save().then(() =>{
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



router.put('/update/:id', async(req,res)=>{
    const {nome,status} = req.body
    if(!nome){
        res.status(422).json({msg: "O nome é obrigatório"})
   }

   if(status == 0 || !status){
    res.status(422).json({msg: "Selecione um status antes de prosseguir!"})
   }

    else{
       await Salas.findOne({_id: {$ne: `${req.params.id}`}, nome: nome.toUpperCase(), D_E_L_E_T:''}).lean().then((name)=>{
         if(name){       
                  res.status(404).json({msg:'Nome já está registrado no banco.'})
            
                    }

     else{
       Salas.findOne({_id: req.params.id}).then((salass)=>{

            if (salass.nome !== nome || salass.status !== status) {
                            // Faça as atualizações apenas se houver diferenças

                       const filter = { _id: req.params.id };
                            const update = { $set: { nome: nome.toUpperCase(), status: status
                            , date_update: Date.now()}};
                            
                            Salas.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
                                 res.status(200).json({msg:'Sala atualizada com sucesso!'})
                                }).catch((err) => {
                                 res.status(404).json({msg:'Error ao atualizar sala!'})
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
       res.status(404).json({msg:'Sala não encontrada.'})
    })
    }
})


router.put('/delete/:id', async(req,res)=>{
    Salas.findOne({_id:req.params.id}).then(()=>{
        const filter = { _id: req.params.id };
        const update = { $set: { D_E_L_E_T: '*',status:'D'
        , date_update: Date.now()}};

       Salas.findByIdAndUpdate(filter, update, { new: true }).then(() =>{
            res.status(200).json({msg:'Sala deletada com sucesso!'})
           }).catch((err)=>{
            res.status(404).json({msg:'Error ao deletar sala. ERROR: '+err})
           })
   }).catch((err)=>{
    res.status(404).json({msg:'Sala não encontrada.'})
   })
})

module.exports = router