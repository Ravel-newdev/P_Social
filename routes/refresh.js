const express = require('express')
const router = express.Router()
const checkRefreshToken = require('../middleware/refreshToken')
const jwt = require('jsonwebtoken')


router.post("/refresh",checkRefreshToken,async(req,res)=>{

    const {refreshToken} = req.body
     
     try{
         const secret = process.env.SECRET

         const token = jwt.sign({
            refreshToken

          },secret,{
            expiresIn: '1800s'
          }
          )
          
          res.status(200).json({msg: "Novo token gerado", token})
          
          
        }catch(err){
          console.log(err)
          res.status(500).json({msg: "erro no server tente novamente mais tarde"})
        }
        
      })

      module.exports = router