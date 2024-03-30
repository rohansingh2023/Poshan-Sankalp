import mongoose from "mongoose";
export const connectDB = async() => {
try {
    const {connection} =await mongoose.connect(process.env.MONGO,{
        dbName:"bloodcare"
    });

    console.log('db connected');
// testing user
// const bblodbank =new Bloodbank({
//     name:"Akshar blood bank",
//     email:"akshar@gmail.com",
//     address:"dahisar",
//     phone: 8979325633,
//     apos:6,
//     bpos:8,
//     abpos:9,
//     opos:34,
//     aneg:6,
//     bneg:8,
//     abneg:9,
//     oneg:34,
//     userId:"65f66e91bb105fb9962cbeb9"

// })
//     await bblodbank.save();
//     console.log('user is ceated');
} catch (error) {
    console.log("failed to connect", error);
}
}