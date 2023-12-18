const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reserva_Salas = new Schema({
   cod_reserva:{
    type: Number,
    required:true,
    unique: true
   },
   cod_user:{
    type: String,
    required:true
   },
   cod_sala:{
    type:Number,
    ref: 'salas',
    required:true
   }
   ,
    desc:{
    type:String,
    required: true
   },
   date_reserv:{
    type:String,
    required: true
   },
   date_entrega:{
    type:String,
    required: true
   },
   date_create:{
    type:String,
    default:Date.now()
   },
   date_update:{
    type:Date,
    default:Date.now()
   },
   hora_reserva:{
    type:String,
    required:true
   },
   hora_entrega:{
    type:String,
    required:true
   },
   D_E_L_E_T:{
    type:String,
    default:''
   }
})

const Reserva_Sala = mongoose.model('reserva_salas', Reserva_Salas)
module.exports = Reserva_Sala