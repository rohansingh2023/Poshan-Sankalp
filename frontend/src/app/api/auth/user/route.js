import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/users";
export const POST = async (request) => {
  await connectDB();
  try {
  const { name, email, phone, address, bloodGroup, isDoner, password } = await request.json();

console.log(name, email, phone, address, bloodGroup, isDoner, password);
  const hashedPassword = await bcrypt.hash(password, 5);
console.log(hashedPassword);
  const newUser = new User({
    name,
    email,
    phone,
    address,
    bloodGroup,
    isDoner,
    password: hashedPassword,
  });
   
  console.log(newUser);
    await newUser.save();
    return new NextResponse("User created", {
      msg:"user successfully Resgisterd",
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}; 


export const GET = async () => {
    try {
        await connectDB(); // Assuming connectDB establishes the database connection
        // Fetch all users from the database
        const users = await User.find();

        // Log fetched users
        console.log("Fetched users:", users);

        // Return response with users
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Users fetched successfully",
            users
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching users:', error);
        // Rethrow the error to be handled by the caller
        throw error;
    }
};

