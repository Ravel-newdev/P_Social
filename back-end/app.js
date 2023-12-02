/*====================================================================

    @author guilherme ferreira
    @since 01/10/2023
    @version 1.0

======================================================================*/
const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const port = 8081

//importação dos usuarios
require('./models/Usuario')
const usuarios = mongoose.model('usuarios')

//importação das salas
require('./models/Sala')
const salas = mongoose.model('salas')

//importação equipamentos
require('./models/Equipamento')
const equipamentos = mongoose.model('equipamentos')


//==========================  usuarios  =======================================
//listando dados do banco
app.get('/', async(req,res)=>{
    const usuario = await usuarios.find()
    res.send(usuario)
})

//inserindo dados no banco
app.post('/', async(req,res)=>{
    const usuario = new usuarios({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        status: req.body.status
    })
    await usuario.save()
    res.send(usuario)
})

//deletando os dados
app.delete('/:id', async (req,res)=>{
    const usuario = await usuarios.findByIdAndDelete(req.params.id)
    res.send(usuario)
})

//atualizando os dados
app.put('/:id',async (req,res)=>{
    const usuario = await usuarios.findByIdAndUpdate(req.params.id,{
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        status: req.body.status
    })

    return res.send(usuario)
})

//======================== salas ================================


//listando dados do banco
app.get('/salas/', async(req,res)=>{
    const sala = await salas.find()
    res.send(sala)
})

//inserindo dados no banco
app.post('/salas/', async(req,res)=>{
    const sala = new salas({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        status: req.body.status
    })
    await sala.save()
    res.send(sala)
})

//deletando os dados
app.delete('/salas/:id', async (req,res)=>{
    const sala = await salas.findByIdAndDelete(req.params.id)
    res.send(sala)
})

//atualizando os dados
app.put('/salas/:id',async (req,res)=>{
    const sala = await salas.findByIdAndUpdate(req.params.id,{
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        status: req.body.status
    })

    return res.send(sala)
})

//============================ equipamentos =======================================

//listando dados do banco
app.get('/equipamentos/', async(req,res)=>{
    const equipamento = await equipamentos.find()
    res.send(equipamento)
})

//inserindo dados no banco
app.post('/equipamentos/', async(req,res)=>{
    const equipamento = new equipamentos({
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        status: req.body.status
    })
    await equipamento.save()
    res.send(equipamento)
})

//deletando os dados
app.delete('/equipamentos/:id', async (req,res)=>{
    const equipamento = await equipamentos.findByIdAndDelete(req.params.id)
    res.send(equipamento)
})

//atualizando os dados
app.put('/equipamentos/:id',async (req,res)=>{
    const equipamento = await equipamentos.findByIdAndUpdate(req.params.id,{
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        status: req.body.status
    })

    return res.send(equipamento)
})




app.listen(port, ()=>{
    mongoose.connect('mongodb+srv://adminclee:7Xfo74rUgByzsIq7@clee.pp8hl8k.mongodb.net/?retryWrites=true&w=majority')
    console.log('node JS running in port 8081')
})