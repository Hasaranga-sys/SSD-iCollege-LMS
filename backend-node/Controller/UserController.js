const UserModel = require("../Model/UserModel");

const getAllusers = async (req,res, next) =>{
    let users;
    try{
        users = await UserModel.find();
    }catch(error){
        console.log(error);
    }if(!users){
        return res.status(404).json({message: "not found"})
    }
    return res.status(200).json(users)
}

const addUser = async(req,res,next)=>{
    let {lastName,initials,email,mobileNumber, faculty,
        regNumber, password, role} = req.body;
    let user;

    try{
        user = await UserModel.findOne({regNumber: regNumber})
    }catch(error){
        console.log(error)
    }
    if(!user){
        let finalrole
        let result = regNumber.toLowerCase();
        result = result.substring(3, 0);
        // console.log(result)
        if (result == "adm"){
            role= "admin"
        }else if(result == "lec"){
            role = "lecture"
        }else{
            role ="student"
        }
        // console.log(result)
        try{
            user = new UserModel({
                lastName,initials,email,mobileNumber, faculty,
                regNumber, password, role
            });
            await user.save();
        } catch(error){
            console.log(error);
        } if(!user){
            return res.status(500).json({message: "unable to add"})
        }
        return res.status(201).json(user)



    }else{
        return res.status(400).json({message: "user already regirted"})
    }


    try{
        user = new UserModel({
            lastName,initials,email,mobileNumber, faculty,
            regNumber, password, role
        });
        await user.save();
    } catch(error){
        console.log(error);
    } if(!user){
        return res.status(500).json({message: "unable to add"})
    }
    return res.status(201).json(user)

}

const getUserById = async(req, res , next)=>{
    const id = req.params.id;
    let user;
    try{
        user = await UserModel.findById(id);
    }catch(error){
        console.log(error)
    }
    if(!user){
        return res.status(404).json({message: "Not Found"})
    }
    return res.status(200).json(user)
}

const deleteUserById = async(req, res , next)=>{
    const id = req.params.id;
    let user;
    try{
        user = await UserModel.findByIdAndRemove(id);
    }catch(error){
        console.log(error)
    }
    if(!user){
        return res.status(404).json({message: "cannot delete"})
    }
    return res.status(200).json(user)
}

const updateUser = async(req,res,next)=>{
    const id= req.params.id;
    const {lastName,initials,email,mobileNumber, faculty,
        regNumber, password, role} = req.body;
    let user;
    try{
        user = await UserModel.findByIdAndUpdate(id,{
            lastName,initials,email,mobileNumber, faculty,
            regNumber, password, role
        })
        user = await user.save();
    } catch(error){
        console.log(error);
    } if(!user){
        return res.status(404).json({message: "cannot updte"})
    }
    return res.status(200).json(user)
}
const login = async( req,res,next)=>{
    const {regNumber, password} = req.body;
    try{
        user = await UserModel.findOne({regNumber: regNumber})
    }catch(error){
        console.log(error)
    }
    if(!user){
        return res.status(404).json({message: "Not Found"})
    }
    if (user.password == password){
        return res.status(200).json({
            "userID" : user.id,
            "role" : user.role
        })
    }else{
        return res.status(401).json({message: "Password missmatch"})
    }
}
exports.addUser = addUser;
exports.getAllusers= getAllusers;
exports.getUserById = getUserById;
exports.deleteUserById=deleteUserById;
exports.updateUser=updateUser;
exports.login=login;
