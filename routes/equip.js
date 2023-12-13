const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Equip");
const Equips = mongoose.model("equip");
/*
router.get("/add_equip", (req, res) => {
  res.render("equip/add_equip");
});*/

router.post("/add_equip", async (req, res) => {
   //res.render("equip/add_equip")
  const {codigo,nome,qnt_estoque,status} = req.body
  const existente = await Equips.findOne({nome: nome});//aqui fica a procura do cadastro, pra ver se ele existe
  // validação da entrada de dados
  if(!nome || nome === undefined || nome === null){
    res.status(422).json({msg:'informe um equipamento valido'})
    return
  }
  if(!qnt_estoque){
    res.status(422).json({msg: 'você precisa informar uma quantidade valida'})
    return 
  }
  if(!status){
    res.status(422).json({msg:' Informe o status atual do produto'})
    return
  }
  if(existente){
    res.status(422).json({msg: "Este equipamento já está no sistema, por favor tente novamente"})
    return
  }
  /* sem insomnia 
  else{
  const newEquips = {
    codigo: +req.body.codigo + +1,
    nome: req.body.nome,
    qnt_estoque: req.body.qnt_estoque,
    status: req.body.status,
    
    
   /*
   new Equips(newEquips)
    .save()
    .then(() => {
      req.flash("success_msg", "Salvo com sucesso!");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um error ao salvar. ERROR: ", err);
      res.redirect("/");
    })};
    */
   const equipamento = new Equips({
    nome,
    codigo,
    qnt_estoque,
    status
   })
   equipamento.save()//se aqui funcionar, irá aparecera mensagem de status
  res.status(200).json({msg: "Equipamento salvo com sucesso"})

});
//listar TODOS os equipamentos, o metodo findOne não será usado para pesquisa de equipamentos
router.get("/view_equip", async (req,res) =>{
  const equip_id = req.params.id
  const existente = await Equips.findById(equip_id)
   try{
    if(!existente){
      res.status(422).json({msg: "esse equipamento não está cadastrado no banco de dados"})
     }
    res.status(200).json(existente)
  }catch(err){
    //req.flash('error_msg', "Houve um erro" + err) antigo
    res.status(404).json({msg: "Not found"})
};

});
//o update_equip é para atualizar/editar equipamentos (que surprendente),
router.put("/update_equip:id", async (req,res) => {
  const equip_id = req.params.id
  const {nome,qnt_estoque,status} = req.body
  const existente = await Equips.findById(equip_id)
  try{
    if(!existente){
     res.status(422).json({msg: "esse equipamento não está cadastrado no banco de dados"})
    }
  
    existente.nome = req.body.nome
    existente.qnt_estoque = req.body.qnt_estoque
    existente.status = req.body.status
    
    await existente.save()
  return res.send(equipamento)//saida
}catch(err){
 res.status(422).json({msg: "o equipamento não pode ser atualizado"})
}
})
  //res.render("equip/edit_equip")
  //deletando o equipamento
  router.delete("/delete_equip:id", async (req,res) => {
   const equip_id = req.params.id
   const existente = await Equips.findById(equip_id)
   try{
   if(!existente){
    res.status(422).json({msg: "esse equipamento não está cadastrado no banco de dados"})
   }
  
   //aqui é onde deleta, após validação
   await Equips.findByIdAndDelete(equip_id)
   res.status(200).json({msg: "Equipamento deletado com sucesso"}) 
  }catch(err){
    res.status(500).json({msg: "Ocorreu um erro ao excluir o equipamento"})
  }
  })
  
   

module.exports = router;
