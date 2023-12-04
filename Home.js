const express = require('express');
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars');
const flash = require('connect-flash')
const session = require('express-session')
const { abort } = require('process')
const equip = require('./routes/equip.js')



//configurações
//public
app.use(session({
  secret:'id',
  resave:true,
  saveUninitialized: true
}))

app.use(flash())
app.engine('handlebars', handlebars.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/CLEE_T').then(() => {
  console.log('EITA. Se conectou com sucesso!')
}).catch((err) => {
 console.log('Falha ao se conectar', err)
})

app.use((req,res,next)=>{ //Middleware
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  //res.locals.error = req.flash("error")
  //res.locals.user = req.user || null // - Uma variavel criada pelo passport automaticamente e agora setada
  next()
})


app.use(express.urlencoded({extended: false}))
app.use(express.json())
//public
app.use(express.static(path.join(__dirname,"public")))
//Handlebars


//portas

app.get('/',(req,res)=>{
  res.render('./index')
  })

app.use('/equip', equip)

const PORT = 8081  
app.listen(PORT, () => {
    console.log('Passando pela porta!')
})