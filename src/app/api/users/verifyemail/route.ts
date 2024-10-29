import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

//in  next js every route has to connect database by itself we donot have a single source of truth
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);
        //we are using the greater than operator to check if the token is expired
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }
        console.log(user);
        //updating the user isVerified to true
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        //saving the user
        await user.save();
        //sending the response of success true
        return NextResponse.json({ message: "Email verified successfully", success: true });



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}