require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
jwt = require('jsonwebtoken')
const cors = require('cors')
const checkToken = require('./middleware/checkToken')

//importação das rotas auth
const refresh = require('./routes/refresh')
const auth = require('./routes/auth')

const equip = require('./routes/equip')
const salas = require('./routes/salas')
const reserva_salas = require('./routes/reserva_salas')
const reserva_equip = require('./routes/reserva_equip')

app.use(cors());

mongoose.Promise = global.Promise


//models
const User = require('./models/User')

app.use(express.json())

//open route
app.get('/',(req,res)=>{
    res.status(200).json({msg:"Bem vindo a API"})
})

app.get("/user/:id",checkToken,async(req,res)=>{
  const id = req.params.id

  //check if user exists
  const user = await User.findById(id,'-password')

  if(!user){
      return res.status(404).json({msg: "Usuário não encontrado"})
  }

  res.status(200).json({user})
          

})
    //rotas de registro e login
      app.use('/auth',auth)

      //rota do refresh
      app.use(refresh)
      
      //rotas do admnistrador
      app.use('/equip', equip)
      app.use('/reserva_salas',reserva_salas)
      app.use('/salas', salas)
      app.use('/reserva_equip' , reserva_equip)
      
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const port = process.env.DB_PORT


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@clee.8t8902l.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    //mongoose.connect(`mongodb://localhost/CLEE_T`).then(()=>{    
app.listen(port)
    console.log('connect successful')

}).catch((err)=>{
    console.log('error '+ err)
})