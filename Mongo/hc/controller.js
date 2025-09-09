const  Course = require('../models/courseModel');

const home = async(req,res)=>{
    try {
        return res.status(200).json({message:"Welcome to the Course Management System!"})
    } catch (error) {
        
    }
}

const getAllCourses = async(req,res,next)=>{
    try {
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        next(error)
    }
}
const getCourseById = async(req,res)=>{
    try {
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const createCourse = async(req,res)=>{
    try {
        const {title,instructor,description}=req.body;
        if(!title||!instructor||!description){
            return res.status(400).json({message:"All fields are required"})
        }
        const course = await Course.create(req.body);
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const updateCourse = async(req,res)=>{
    try {
        const course = await Course.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json(course);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const deleteCourse = async(req,res)=>{
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json({message:"Course deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports = {home,getAllCourses,getCourseById,createCourse,deleteCourse,updateCourse}
