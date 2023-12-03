const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const {engine} = require('express-handlebars');
const routes = require('./routes/routes.js')
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/CLEE_db', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('EITA')
}).catch((err) => {
 console.log('pegou não', err)
})
//configurações
//public
//app.use(express.static(path.join(__dirname,'public')))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//public
app.use(express.static(path.join(__dirname,"public")))
//Handlebars
//var handle = handlebars.create({
//    defaultLayout: 'main'
//    });

app.post('/login/choice/add_equip', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Criar um modelo Mongoose para o usuário
  const Equip = mongoose.model('CLEE_Equip', {
    nome,
    status,
    qnt_equip,
  });

  try {
    // Salvar o usuário no MongoDB
    const novoEquip = new Equip({ nome, email, senha });
    await novoEquip.save();
    res.send('Cadastro realizado com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar o produto');
  }
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
//portas
app.use('/routes', routes)
const porta = 7056
app.listen(porta, () => {
    console.log('Passando pela porta')
})