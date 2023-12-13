require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
jwt = require('jsonwebtoken')

const equip = require('./routes/equip')
const salas = require('./routes/salas')
const reserva_salas = require('./routes/reserva_salas')


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

function checkToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]


  if(!token){
      return res.status(401).json({msg: "acesso negado"})
  }

  try{
      const secret = process.env.SECRET
      jwt.verify(token,secret)

      next()

  }catch(err){
      res.status(400).json({msg: "Token inválido"})
  }
}


//register
app.post('/auth/register',async(req,res)=>{

    const {name,password,confirmPassword} = req.body

    //validações
    if(!name){
        return res.status(422).json("O nome é obrigatório")
    }
    if(!password){
        return res.status(422).json("A senha é obrigatória")
    }

    if(password !== confirmPassword){
        return res.status(422).json("Senhas não conferem")
    }

    //check if user exists
    const userExists = await User.findOne({name: name})

    if(userExists){
        return res.status(422).json({msg:"usuário já existe"})
    }

    //create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    //create user
    const user = new User({
        name,
        password: passwordHash,
    })

    try{
        await user.save()

        res.status(201).json({msg: "Usuário criado com sucesso"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg: "erro no server tente novamente mais tarde"})
    }

})

app.post("/auth/login",async(req,res)=>{

    const {name,password,id} = req.body


    if(!name){
        return res.status(422).json("O nome é obrigatório")
    }
    if(!password){
        return res.status(422).json("A senha é obrigatória")
    }

    //check if user exists
    const user= await User.findOne({name: name})

     if(!user){
         return res.status(422).json({msg:"usuário não existe"})
          
     }

     //check password match
     const checkPassword = await bcrypt.compare(password,user.password)

     if(!checkPassword){

        return res.status(404).json("Senha inválida")

     }
     
     try{
         const secret = process.env.SECRET

         const token = jwt.sign({
            id: user._id,

          },secret,
          )
          
          res.status(200).json({msg: "autenticação realizada com sucesso", token})
          
          
        }catch(err){
          console.log(err)
          res.status(500).json({msg: "erro no server tente novamente mais tarde"})
        }
        
      })
      
      app.use('/equip', equip)
      app.use('/reserva_salas',reserva_salas)
      app.use('/salas', salas)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const port = process.env.DB_PORT

//mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@clee.8t8902l.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    mongoose.connect(`mongodb://localhost/CLEE_T`).then(()=>{
    app.listen(port)
    console.log('connect successful')

}).catch((err)=>{
    console.log('error '+ err)
})
