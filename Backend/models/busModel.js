const mongoose = require('mongoose')

const Schema = mongoose.Schema

const busSchema = new Schema({

    driver:{
        type:String,
        required:true,
    },
    time:{
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
    available :{
        type:Boolean,
        default:true,
        required:false
    }
},{timestamps:true})

module.exports = mongoose.model('Bus',busSchema)