const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Salas')
const Salas = mongoose.model('salas')


router.get('/view', (req,res) =>{
Salas.find({D_E_L_E_T:''}).lean().then((salass)=>{
res.render('salas/listar_sala',{salass:salass})
}).catch((err)=>{
req.flash('error_msg','Não foi possivel listar as salas! ERROR: '+err)
res.redirect('/')
})
})

router.get('/view_delete', (req,res) =>{
    Salas.find({D_E_L_E_T:'*'}).lean().then((salass)=>{
    res.render('salas/deletados',{salass:salass})
    }).catch((err)=>{
    req.flash('error_msg','Não foi possivel listar as salas! ERROR: '+err)
    res.redirect('/')
    })
    })
    

router.get('/create', (req,res) => {
    Salas.findOne().sort({_id: -1}).lean().then((u_salass)=>{
    res.render('salas/criar_sala' , {u_salass:u_salass})
    })
})
router.post('/create' , (req,res)=>{

    //Validação primeira, verificando se campos estão ou não vazios

    var erros = [] 

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Digite o nome da sala.'})
   }
   if(req.body.status == 0){
    erros.push({texto:"Selecione um status para a sala antes de prosseguir."})
   }

   if(erros.length > 0){
    Salas.findOne().sort({_id:-1}).lean().then((u_salass)=>{
        res.render('salas/criar_sala', {erros:erros, u_salass:u_salass})   
    }).catch((err)=>{
     req.flash('error_msg',"Houve um error ao carregar o formulário!, Error: "+err)
     res.redirect('/admin')
    })   
     
   }
else{
    //Validação secundária, compara o valor recebido com o existente ao banco de dados para evitar duplicação dos dados.
    
    Salas.findOne({nome:req.body.nome.toUpperCase(), D_E_L_E_T:''}).lean().then((nome)=>{
     if(nome){
       req.flash('error_msg', 'Nome já está registrado no banco.')
       res.redirect('/salas/create')
     }

     else{
        const newSalas = {
            codigo: (+req.body.codigo + +1),
            nome: req.body.nome.toUpperCase(),
            status: req.body.status
         }

        new Salas(newSalas).save().then(() =>{
            req.flash('success_msg','Salvo com sucesso!')
            res.redirect('/')
        }).catch((err) => {
           req.flash('error_msg','Houve um error ao salvar. ERROR: '+err)
           res.redirect('/')
        })
     }
    }).catch((err)=>{
        req.flash('error_msg','Houve um error ao validar os dados. ERROR: '+err)
        res.redirect('/')
    })
    }
})


router.get('/update/:id', (req,res) => {
        Salas.findOne({_id:req.params.id}).lean().then((salass)=>{
            res.render('salas/atualizar_sala', {salass:salass})
    
    })
})

router.post('/update', (req,res)=>{
    var erros = [] 

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Digite o nome da sala.'})
   }
   if(req.body.status == 0){
    erros.push({texto:"Selecione um status para a sala antes de prosseguir."})
   }

   if(erros.length > 0){
        Salas.findOne({_id:req.body.id}).lean().then((salass) =>{
            res.render('salas/atualizar_sala', {erros:erros, salass:salass})   
         }).catch((err)=>{
          req.flash('error_msg', 'Não foi possivel encontrar a postagem! ERROR: '+err)
          res.redirect('/salas/view')
         })   
}

    else{
        Salas.findOne({_id: {$ne: `${req.body.id}`}, nome: req.body.nome.toUpperCase(), D_E_L_E_T:''}).lean().then((nome)=>{
         if(nome){       
                    req.flash('error_msg', 'Nome já está registrado no banco.')
                    res.redirect(`/salas/view`)
            
                    }

     else{
        Salas.findOne({_id: req.body.id}).then((salass)=>{

            if (salass.nome !== req.body.nome || salass.status !== req.body.status) {
                            // Faça as atualizações apenas se houver diferenças

                       /*const filter = { _id: req.body.id };
                            const update = { $set: { nome: req.body.nome.toUpperCase(), status: req.body.status
                            , date_update: Date.now()}};
                            
                            Salas.findOneAndUpdate(filter, update, { new: true }).then(() =>{
                                  req.flash('success_msg', 'Sala atualizada com sucesso!')
                                  res.redirect('/salas/view')
                                }).catch((err) => {
                                    req.flash('error_msg','Ocorreu um erro durante o processo de atualização das salas. ERROR: '+err)
                                    res.redirect('/salas/view')
                                })*/

                                salass.nome = req.body.nome.toUpperCase()
                                salass.status =  req.body.status
                                salass.date_update = Date.now()
    
                                salass.save().then(()=>{
                                    
                                    req.flash('success_msg','Sala atualizada com sucesso!')
                                    res.redirect('/salas/view')
                            }).catch((err)=>{
                                req.flash('error_msg','Não foi possivel atualizar a sala'+err)
                            })


                               ;
                    } 
                    
                    else {
                            // Nenhum dado foi alterado, redirecione com uma mensagem
                            req.flash('error_msg', 'Nenhuma alteração feita nos dados!');
                            res.redirect('/salas/update/'+salass._id);
                        }
           
            }).catch((err)=>{
              req.flash('error_msg','Erro ao atualizar sala. ERROR: '+err)
              res.redirect('/')
            })
     }

}).catch((err)=>{
        req.flash('error_msg','Houve um error ao validar os dados. ERROR: '+err)
        res.redirect('/')
    })
    }
})


router.post('/delete/:id', (req,res)=>{
    Salas.findOne({_id:req.params.id}).then((salass)=>{
        salass.D_E_L_E_T = '*'
        salass.status = 'D'
        salass.date_update = Date.now()
        salass.save().then(()=>{
           req.flash('success_msg','Sala apagada com sucesso!')
           res.redirect('/salas/view')
   }).catch((err)=>{
       req.flash('error_msg','Não foi possivel apagar a sala. ERROR: '+err)
       res.redirect('/salas/view')
   })
   })
})

module.exports = router