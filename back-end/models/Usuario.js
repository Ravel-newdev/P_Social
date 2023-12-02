const mongoose = require('mongoose')

const usuarios = mongoose.model('usuarios',{
    nome:  String,
    telefone: String,
    email: String, 
    status: Boolean,
    departamento: String,
})
