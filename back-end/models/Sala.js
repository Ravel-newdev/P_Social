const mongoose = require('mongoose')

const salas = mongoose.model('salas',{
    nome:  String,
    status: Boolean,
})
