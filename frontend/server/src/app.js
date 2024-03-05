require('dotenv').config();
const express = require("express");
const cors = require('cors'); // Import the cors package
require("./db/conn");

// Import the router, not the file itself
const authRouter = require("../router/auth-router");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3001',
}));

app.use(express.json());

// Use the authRouter as middleware
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});








// import collection that is user 
// const User = require("./models/users");
// use exprees 
// const app = express();
// const port = process.env.PORT || 3000;
// middle ware
// app.use(cors({
//     origin: 'http://localhost:3001',
//   }));
// data in the body is in json format, to use that data needs app.use(express.json());
// app.use(express.json());
//create user
// post method to create new user
// app.post("/users", (req, res) => {
//     // get data present in the body 
//     const {name , email, phone, address, bloodGroup, isDoner} = req.body;
//     const Userexist = User.findOne({email : email});

//     if(Userexist){
//         console.log("user already exist");
//         res.status(400).json({msg:"user is already exist"});
//     }
//     const user = new User(req.body);
//     console.log(req.body);

//     // to save it in database
//     user.save().then(() => {
//         res.status(201);
//         res.send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//         // res.send(e);
//     })
// })


// app.get("/users", async (req, res) => {

//     try {
//         const data = await User.find();
//         res.send(data);
//         console.log(data,"hellooohfhfhfhf");
//     } catch (e) {
//         console.log("Didnot get data", e);
//     }

// })



// to get data by id
// app.get("/users/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const individualUser = await User.findById(_id);
//         console.log("single data", individualUser);

//         if (!individualUser) {
//             res.status(404).send();
//         } else {
//             res.send(individualUser);
//         }

//     } catch (e) {
//         res.status(400);
//         res.send(e);
//     }
// })

// // to get data by name
// // app.get("/users/:name",async(req,res)=>{
// //     try{
// //         const name = req.params.name;
// //         const data = await User.find({ name: name });
// //         console.log(name);
// //         res.send(data);
// //     }catch(e){
// //         res.status(400);
// //         res.send(e);
// //     }
// // })

// app.delete("/users/:id", async (req, res) => {

//     try {
//         const _id = req.params.id;
//         const _deleteid = await User.findByIdAndDelete(_id);
//         if (!_deleteid) {
//             res.status(404).send()
//         } else {
//             res.send(_deleteid);
//         }
//     } catch (e) {
//         res.status(400);
//         res.send(e);
//     }

// })
// // dpdate data
// app.patch("/users/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const updateby_id = await User.findByIdAndUpdate(_id, req.body, {
//             new : true
//         });
//         console.log("daf",updateby_id);
//         res.send(updateby_id);
//     } catch (e) {
//         res.status(400);
//         res.send(e);
//     }
    
// })
// whteher connection has been setup or not check 
// app.listen(port, () => {
//     console.log(`connection is setup at ${port}`);
// })