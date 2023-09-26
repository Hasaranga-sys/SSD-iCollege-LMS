const SubjectModel = require("../Model/SubjectModel");

const getAllSubject = async (req,res, next) =>{
    let subjects;
    try{
        subjects = await SubjectModel.find();
    }catch(error){
        console.log(error);
    }if(!subjects){
        return res.status(404).json({message: "not found"})
    }
    return res.status(200).json(subjects)
}



const addSubject = async(req,res,next)=>{
    const {faculty,year,subject} =req.body;
    let sub;
    try {
        sub = new SubjectModel({
            faculty,year,subject
        });
        await sub.save();
    } catch (error) {
        console.log(error);
    }if(!sub){
        return res.status(500).json({message:"unable to add"})
    }
    return res.status(201).json({sub});
}

exports.getAllSubject = getAllSubject;
exports.addSubject = addSubject;
