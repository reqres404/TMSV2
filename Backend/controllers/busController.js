const Bus = require('../models/busModel')
const mongoose = require('mongoose')
//get all workouts
const getBuses = async(req,res)=>{
    const buses = await Bus.find({}).sort({createdAt:-1})
    res.status(200).json(buses)
}
//get single workout
const getBus = async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const bus = await Workout.findById(id)

    if(!bus){
        return res.status(404).json({error:"Invalid Id"})
    }
    res.status(200).json(bus)

}
//create a new workout
const createBus= async(req,res)=>{
    const{driver,time,liplate,phone} = req.body

    // let emptyFields = []

    // if(!title){
    //     emptyFields.push('title')
    // }
    // if(!load){
    //     emptyFields.push('load')
    // }
    // if(!reps){
    //     emptyFields.push('reps')
    // }
    // if(emptyFields.length>0){
    //     return res.status(400).json({error:"Please fill all fields",emptyFields})
    // }
    //add doc to db
    try {
        const bus = await Bus.create({driver,time,liplate,phone})
        res.status(200).json(bus)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}
//delete a workout
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
//update a workout
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
    updateBus
}