const mongoose = require('mongoose')

const equipamentos = mongoose.model('equipamentos',{
    nome:  String,
    departamento: String,
    quantidade: Number
})
