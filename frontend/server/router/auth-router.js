// auth-router.js
const bcrypt = require('bcryptjs');
const express = require("express");
const router = express.Router();
const User = require("../src/models/users");
const Bloodbank = require("../src/models/bloodbank")
const userExistsMiddleware = require('../middleware/userExistsMiddleware');
const userAuth = require('../middleware/userAuth')

router.route("/users").get(async (req, res) => {
    try {
        const data = await Bloodbank.find();
        res.send(data);
        console.log(data, "chuup");
    } catch (e) {
        console.log("Did not get data", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// router.route("/bloodreq").post(async (req,res) =>{
//     const { bloodType, quantity } = req.body;

//   try {
//     // Find all blood banks and calculate total quantity for the requested blood type
//     const allBloodbanks = await Bloodbank.find();
//     const totalAvailableQuantity = allBloodbanks.reduce((total, bank) => total + bank[bloodType], 0);

//     if (totalAvailableQuantity >= quantity) {
//       // Blood is available in the requested quantity
//       // Filter blood banks that have enough quantity for the requested blood type
//       const availableBloodbanks = allBloodbanks.filter(bank => bank[bloodType]);
//       console.log(availableBloodbanks);
//       res.json({
//         success: true,
//         message: `${quantity} units of ${bloodType} blood are available.`,
//         availableBloodbanks
//       });
//     } else {
//       // Blood is not available in the requested quantity
//       res.status(404).json({
//         success: false,
//         message: `${quantity} units of ${bloodType} blood are not available.`
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while checking blood availability.',
//       error: error.message
//     });
//   }
// });

router.route("/bloodreq").post(async (req,res) =>{
  const { bloodType, quantity } = req.body; // Extracting bloodType and quantity from the request body

  try {
      // Find blood banks that have the requested blood type and quantity
      const availableBloodbanks = await Bloodbank.find({ [bloodType]: { $gte: quantity } });

      if (availableBloodbanks.length > 0) {
          // Blood is available in the requested quantity in one or more blood banks
          res.json({
              success: true,
              message: `${quantity} units of ${bloodType} blood are available.`,
              availableBloodbanks
          });
      } else {
          // Blood is not available in the requested quantity
          res.status(404).json({
              success: false,
              message: `${quantity} units of ${bloodType} blood are not available.`
          });
      }
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'An error occurred while checking blood availability.',
          error: error.message
      });
  }
});

// here we use middle ware 
router.route("/users").post(userExistsMiddleware,async (req, res) => {
    try {
        // Get data present in the body
        const { name, email, phone, address, bloodGroup, isDoner, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const Bycryptpass = bcrypt.hashSync(password, salt);
        // Create a new user instance
        const user = new User({
            name,
            email,
            phone,
            address,
            bloodGroup,
            isDoner,
            password:Bycryptpass,
        });
        console.log("User is being created",user);
        // Save the user in the database
        await user.save();
        console.log(user);
        // Respond with the created user
        res.status(201).json({
            msg:"user successfully registered",
            token: await user.generateToken(),
            userId: user._id.toString(),
        });
    } catch (e) {
        console.log("Error creating user", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.route("/login").post(async (req, res) =>{
    try {
        const{email, password} = req.body;
        const Userexist =  await User.findOne({email});

        if(!Userexist){
            return res.status(400).json({message:"Inavalid Credentials"});
        }
        // const user = password === Userexist.password;

        // const isUser= await bcrypt.compare(password, Userexist.password);
        const isUser= await Userexist.comparePassword(password);
        console.log("hanumannn",isUser);

        if (isUser) {
                  // Passwords match (user entered correct password)
                  console.log('Password is correct');
                  res.status(200).json({
                    msg:"login Successfulllyyy",
                    token: Userexist.generateToken(),
                    userId:Userexist._id.toString(),
                    userName:Userexist.name,
                });
                } else {
                  // Passwords do not match (user entered incorrect password)
                  console.log('Password is incorrect');
                  res.status(401).json({
                    error:"password is incorrectlyyyy"
                  })
                }


    } catch (error) {
        res.status(500).json("internal server error");
    }
});

router.route("/user").get(userAuth, async(req, res)=>{
    try {
        const email= req.user.email;
        const foundUser =await User.findOne({email});
        console.log(foundUser);
        res.send(foundUser);
    } catch (error) {
        res.status(500);
    }
});



module.exports = router;
