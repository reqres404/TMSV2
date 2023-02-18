const mongoose = require('mongoose')

const Schema = mongoose.Schema

const busSchema = new Schema({

    driver:{
        type:String,
        required:true,
    },
    route:{
        type:String,
        required:true,
    },
    occupancy:{
        type:Number,
        required:true,
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    liplate:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    contract:{
        type:Boolean,
        default:true,
        required:false
    },
    available :{
        type:Boolean,
        default:true,
        required:false
    },
    userBooked:{
        type:String,
        default:" ",
        required:false
    }
},{timestamps:true})

module.exports = mongoose.model('Bus',busSchema)