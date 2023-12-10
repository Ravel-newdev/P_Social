const express = require('express')
const app = express()
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const { abort } = require('process')
const equip = require('./routes/equip.js')
const adm = require('./routes/adm.js')
const salas = require('./routes/salas.js')



//configurações
//public
app.use(session({
  secret:'id',
  resave:true,
  saveUninitialized: true
}))

app.use(flash())
app.engine('handlebars', handlebars.engine({helpers: {
  eq: function (a, b) {
    return a === b;
  }
},defaultLayout:'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise
//mongoose.connect('mongodb+srv://cleeOwner:64jQTn99mIsFEl59@clee.8t8902l.mongodb.net/?retryWrites=true&w=majority').then(() => { // Produção
  mongoose.connect('mongodb://localhost/CLEE_T').then(() => { //Prototipo
  console.log('Conectado com sucesso!')
}).catch((err) => {
 console.log('Falha ao se conectar', err)
})

app.use((req,res,next)=>{ //Middleware
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
 // - Uma variavel criada pelo passport automaticamente e agora setada
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
app.use('/adm', adm)
app.use('/salas', salas)
const PORT = 8081  
app.listen(PORT, () => {
    console.log('Servidor rodando na porta 8081')
})