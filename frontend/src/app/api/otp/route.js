import { NextResponse } from "next/server";
import twilio from 'twilio';
export const POST = async (request) => {
    try {
    const {name, bankContact, address, quantity, urgent, bloodType } = await request.json();
        console.log(name,"  ", address )

         // Initialize Twilio client with your account SID and auth token
         const accountSid = 'ACa51b191fb51dde22cc954c24b7613b80';
         const authToken = 'e85819067041e45c9dc5f13337b86443';
         const client = twilio(accountSid, authToken);

         await client.messages.create({
            from: '+16592742455', // Your Twilio phone number
            to: `+91${bankContact}`, // Recipient's phone number
            body: `I am from ${address}, I need ${bloodType} blood`, // Customize the message here
        });
      return new NextResponse("otp sent success fully", {
        msg:"otp sent success fully",
        status: 201,
      });
    } catch (err) {
      return new NextResponse(err.message, {
        status: 500,
      });
    }
  }; 