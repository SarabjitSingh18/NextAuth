import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"User logged out successfully",
            success:true
        })
        //clearing the cookie
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
        
    }
}