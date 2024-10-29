import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"

//in  next js every route has to connect database by itself we donot have a single source of truth
connect()


export async function POST(request: NextRequest) {
    try {
        //using the request to get the json requestBody in next js is a edge case
        // we need to use the await keyword to wait for the json to be parsed
        //because next js is working in the edge runtime
        const reqBody = await request.json()
        const {email,password} = reqBody 
        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error:"User does not exist"},{status:404})
            
        }
        console.log("user exists")

        //check if password is correct
        const validPassword =  await bcryptjs.compare(password,user.password)   
        if(!validPassword) {
            return NextResponse.json({error:"Invalid Password"},{status:401})

        }
        console.log(user)

        //create a token data->
        const tokenData = {
            id: user._id,
            username:user.username,
            email:user.email
        }

        //create token->
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        //return response
        const response = NextResponse.json({
            message:"Login successful",
            success:true,
          
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }

}
