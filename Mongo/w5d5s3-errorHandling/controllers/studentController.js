const Student = require('../models/studentModel');

const createStudent = async(req, res, next) => {
    try {
        const student = new Student(req.body);
        const {name, age, department} = req.body;
        if(name === '' || age === '' || department === '')
        {
            return res.status(400).json({message: 'Name, age, and department are required'});
        }
        const newStudent = await student.save();
        return res.status(201).json(newStudent);
        
    } catch(error) {
        next(error);
        // return res.status(500).json({error: error.message});
    }
}

const getAllStudents = async(req, res, next) => {
    try {
        const mockStudents = await Student.find({});
        return res.status(200).json(mockStudents)
    } catch(error) {
        next(error);
        // return res.status(500).json({error: error.message});
    }
}

const updateStudent = async(req, res, next) => {
    try {
        const updateStudent = await Student.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true});
        if(!updateStudent)
        {
            return res.status(404).json({message: "Student not found"})
        }
        return res.status(200).json(updateStudent);
    } catch(error) {
        next(error);
        // return res.status(500).json({error: error.message});
    }
}

const deleteStudent = async(req, res, next) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params._id);
        if(!deleteStudent)
        {
            return res.status(404).json({message: "Student not found"})
        }
        return res.status(200).json({message: "Student deleted successfully"});
    } catch(error) {
        next(error);
        // return res.status(500).json({error: error.message});
    }
}


module.exports = {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
}