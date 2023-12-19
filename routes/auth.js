const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//models
const User = require('../models/User')


router.post("/login",async(req,res)=>{

    const {name,password} = req.body


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
         const refreshToken = jwt.sign({ name,password }, secret)

         const token = jwt.sign({
           refreshToken

          },secret
          )
          
          res.status(200).json({msg: "autenticação realizada com sucesso", token, refreshToken})
          
          
        }catch(err){
          console.log(err)
          res.status(500).json({msg: "erro no server tente novamente mais tarde"})
        }
        
      })

      //register
router.post('/register',async(req,res)=>{

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

      module.exports = router