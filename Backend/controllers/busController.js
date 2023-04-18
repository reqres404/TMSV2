const Bus = require('../models/busModel')

const mongoose = require('mongoose')

//get all buss
const getBuses = async(req,res)=>{
    const buses = await Bus.find({}).sort({createdAt:-1})
    res.status(200).json(buses)
}
//get single bus
const getBus = async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such bus"})
    }
    const bus = await Bus.findById(id)

    if(!bus){
        return res.status(404).json({error:"Invalid Id"})
    }
    res.status(200).json(bus)

}
//create a new bus
const createBus= async(req,res)=>{
    const{driver,route,occupancy,time,date,liplate,phone} = req.body
    let emptyFields = []

    if(driver.length<2){
        emptyFields.push("Name should have more than 2 characters\n")
    }
    // if(!route.includes("-to-")){
    //     emptyFields.push("Route Field is Invalid")
    // }
    if(occupancy>120){
        emptyFields.push('Please enter valid occupancy')
    }
    
    if(liplate.length!==11){
        emptyFields.push('Invalid License  Plate')
    }
    if(phone.length!==10){
        emptyFields.push('Phone Number is Invalid')
    }
    if(emptyFields.length>0){
        for(i=0; i<emptyFields.length; i++){
            return res.status(400).json({error:emptyFields[i],emptyFields})
        }
    }
    //add doc to db
    try {
        const bus = await Bus.create({driver,route,occupancy,time,liplate,phone,date})
        res.status(200).json(bus)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}
//delete a bus
const deleteBus = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mssg:"No such buses available"})
    }

    const bus = await Bus.findOneAndDelete({_id:id})
    if(!bus){
        return res.status(400).json({error:"No such bus!"})
    }
    res.status(200).json(bus)
}
//update a bus
const updateBus= async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mssg:"No such bus available"})
    }
    const bus = await Bus.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!bus){
        return res.status(400).json({error:"No such bus"})
    }
    res.status(200).json(bus)

}


module.exports={
    createBus,
    getBus,
    getBuses,
    deleteBus,
    updateBus,
}