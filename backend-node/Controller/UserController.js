const UserModel = require("../Model/UserModel");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser')

//
const getAllusers = async (req, res, next) => {
  const userModel = req.user
  console.log("userModel", userModel)

  if (userModel.role != "admin") {
    return res.status(401).json({ message: "Invalid user!" });
  }
  
  try {
    const users = await UserModel.find();
    
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//register user
const addUser = async (req, res, next) => {
    const {
      lastName,
      initials,
      email,
      mobileNumber,
      faculty,
      regNumber,
      password,
      role,
    } = req.body;
  
    try {

      if (!lastName || ! initials || !email || !mobileNumber || !faculty || !regNumber || !password ) {
        return res.status(400).json({ message: "Please add all fields" });
      }

      // Check if a user with the same regNumber already exists
      const existingUser = await UserModel.findOne({ regNumber: regNumber });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already registered" });
      }
  
      // Hash the password before saving it
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Determine the role based on the regNumber prefix
      let result = regNumber.toLowerCase().substring(0, 3);
      let finalRole;
  
      if (result === "adm") {
        finalRole = "admin";
      } else if (result === "lec") {
        finalRole = "lecture";
      } else {
        finalRole = "student";
      }
  
      // Create a new user with the hashed password
      const newUser = new UserModel({
        lastName,
        initials,
        email,
        mobileNumber,
        faculty,
        regNumber,
        password: hashedPassword, // Store the hashed password
        role: finalRole,
      });
  
      await newUser.save();
  
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      return res.status(500).json({ message: "Unable to add user" });
    }
  };



const getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findByIdAndRemove(id);

    if (!user) {
      return res.status(404).json({ message: "User not found; cannot delete" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {
      lastName,
      initials,
      email,
      mobileNumber,
      faculty,
      regNumber,
      password, // New password
      role,
    } = req.body;
  
    try {
      const user = await UserModel.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found; cannot update" });
      }
  
      // Hash the new password if provided
      if (password) {
        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
      }
  
      // Update other user fields
      user.lastName = lastName;
      user.initials = initials;
      user.email = email;
      user.mobileNumber = mobileNumber;
      user.faculty = faculty;
      user.regNumber = regNumber;
      user.role = role;
  
      await user.save();
  
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user by ID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  


const login = async (req, res, next) => {
    const { regNumber, password } = req.body;
    try {
      const user = await UserModel.findOne({ regNumber: regNumber });
      console.log("user", user)
  
      if (!user) {
        return res.status(404).json({ message: "Not Found" });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        let tokenGen = generateJWTToken(user.id, user.regNumber, user.role);
        res.cookie('token', tokenGen)
        return res.status(200).json({
          userID: user.id,
          role: user.role,
          token: tokenGen
        });
      } else {
        return res.status(401).json({ message: "Password mismatch" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

let jwt_sec = 'abc123';  
const generateJWTToken = (id, regId, role) =>{
  return jwt.sign({id, regId, role}, jwt_sec,{
    expiresIn: '2d',
  })
}

  

  

exports.addUser = addUser;
exports.getAllusers= getAllusers;
exports.getUserById = getUserById;
exports.deleteUserById=deleteUserById;
exports.updateUser=updateUser;
exports.login=login;








// // error hanndled update
// const updateUser = async (req, res, next) => {
//     const id = req.params.id;
//     const {
//       lastName,
//       initials,
//       email,
//       mobileNumber,
//       faculty,
//       regNumber,
//       password,
//       role,
//     } = req.body;
  
//     try {
//       const user = await UserModel.findByIdAndUpdate(
//         id,
//         {
//           lastName,
//           initials,
//           email,
//           mobileNumber,
//           faculty,
//           regNumber,
//           password,
//           role,
//         },
//         { new: true } // Ensure you get the updated document
//       );
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found; cannot update" });
//       }
  
//       return res.status(200).json(user);
//     } catch (error) {
//       console.error("Error updating user by ID:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };






// // error hanndled login  
// const login = async( req,res,next)=>{
//     const {regNumber, password} = req.body;
//     try{
//         user = await UserModel.findOne({regNumber: regNumber})
//     }catch(error){
//         console.log(error)
//     }
//     if(!user){
//         return res.status(404).json({message: "Not Found"})
//     }
//     if (user.password == password){
//         return res.status(200).json({
//             "userID" : user.id,
//             "role" : user.role
//         })
//     }else{
//         return res.status(401).json({message: "Password missmatch"})
//     }
// }


// // error hanndled create
// const addUser = async (req, res, next) => {
//   const {
//     lastName,
//     initials,
//     email,
//     mobileNumber,
//     faculty,
//     regNumber,
//     password,
//     role,
//   } = req.body;

//   try {
//     // Check if a user with the same regNumber already exists
//     const existingUser = await UserModel.findOne({ regNumber: regNumber });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already registered" });
//     }

//     // Determine the role based on the regNumber prefix
//     let result = regNumber.toLowerCase().substring(0, 3);
//     let finalRole;

//     if (result === "adm") {
//       finalRole = "admin";
//     } else if (result === "lec") {
//       finalRole = "lecture";
//     } else {
//       finalRole = "student";
//     }

//     // Create a new user
//     const newUser = new UserModel({
//       lastName,
//       initials,
//       email,
//       mobileNumber,
//       faculty,
//       regNumber,
//       password,
//       role: finalRole,
//     });

//     await newUser.save();

//     return res.status(201).json(newUser);
//   } catch (error) {
//     console.error("Error adding user:", error);
//     return res.status(500).json({ message: "Unable to add user" });
//   }
// };