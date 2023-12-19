const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reserva_Equip = new Schema({
   cod_reserva:{
    type: Number,
    required:true,
    unique: true
   },
   cod_user:{
    type: String,
    required:true
   },
   cod_equip:{
    type:Number,
    ref: 'equip',
    required:true
   }
   ,
   nome_equip:{
    type:String,
    ref:'equip',
    required:true
   }
   ,
    desc:{
    type:String,
    required: true
   },
   qnt_equip:{
    type: Number,
    required:true
   }
   ,
   date_reserv:{
    type:String,
    required: true
   },
   date_entrega:{
    type:String,
    required: true
   },
   hora_reserva:{
    type:String,
    required:true
   },
   hora_entrega:{
    type:String,
    required:true
   },
     date_create:{
      type:Date,
      default:Date.now()
     },
     date_update:{
      type:Date,
      default:Date.now()
     },
   D_E_L_E_T:{
    type:String,
    default:''
   }
})

const Reserva_Equips = mongoose.model('reserva_equip', Reserva_Equip)
module.exports = Reserva_Equips