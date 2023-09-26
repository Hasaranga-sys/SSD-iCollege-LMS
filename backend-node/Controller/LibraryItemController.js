
const cloudinary = require("../utils/cloudinary")
const multer  = require('multer')
const uuid=require('uuid').v4;
const path = require('path');
const PDF = require('../Model/LibraryItemModel')
//const upx= require("../uploads")


const files=[]
const fileInArray=[]

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        let filePath=[];
        console.log("MULTER ENTRY", file.originalname)
        console.log("FILES", req.files)

        const ext = path.extname(file.originalname);
        const id = uuid();
        filePath = `${id}${ext}`;
        fileInArray.push([(filePath)])
        console.log("IN ARRAY ",filePath) 
        files.push(fileInArray)
        console.log("PUSHED MAIN ARRAY", fileInArray)
        cb(null,filePath)       
        console.log("current length",files.length)
    }
})

const upload=multer({
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error('Only .png, jpg, .jpeg and .pdf format allowed!'));
        }
    },
    storage:storage,
})


const addItem = async(req,res)=>{
    upload.array('uploaded_Image',10)
    try{
        console.log(req.files.length)
        console.log("Files",fileInArray)
        // let img;

        let pdff;

        for(let i=0;i<fileInArray.length;i++){
            let fileext = fileInArray[i][0].split('.')[1];
            console.log(path.resolve(__dirname, "../uploads"))
            // if(fileext=='jpg' || fileext=='png' || fileext=='jpeg')
            // img = await cloudinary.uploader.upload(`${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`);

            if(fileext=="pdf")
            pdff = await cloudinary.uploader.upload(`${path.resolve(__dirname, "../uploads")}/${fileInArray[i][0]}`,{ pages: true });
          
    }
    let pdf = new PDF({
        faculty          :req.body.faculty,
        year :req.body.year,
        subject       :req.body.subject,
        // avatar:img.secure_url,
        pdf : pdff.secure_url,
        // cloudinary_id_img: img.public_id,
        cloudinary_id_pdf:pdff.public_id,
    });

    await pdf.save();
    res.json(pdf);
}catch(err){
    console.log(err);
}
}

const getAllItem = async(req,res)=>{
    try {
        let pdf = await PDF.find();
        res.json(pdf);
    } catch (err) {
        console.log(err);        
    }
};

const getItemById = async(req,res,next)=>{
    const id = req.params.id;
    let pdf;
    try {
        pdf = await PDF.findById(id);
    } catch (error) {
        console.log(error);
    }if(!pdf){
        return res.status(404).json({message:"Not found"})
    }
    return res.status(200).json({pdf})
}

const deleteItem = async(req,res)=>{
    const id = req.params.id;
    let pdf;
    try {
        pdf = await PDF.findByIdAndRemove(id);
    } catch (error) {
        console.log(error)
    }
    if (!pdf) {
        return res.status(404).json({ message: "cannot delete" });
      }
      return res.status(200).json({ message: `topic ${id} deleted` });
}

exports.addItem = addItem;
exports.getAllItem = getAllItem;
exports.deleteItem = deleteItem;
exports.getItemById = getItemById;
