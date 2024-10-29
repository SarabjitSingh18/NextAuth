import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = (request: NextRequest) => {
    try {
        //get token from cookies
        const token = request.cookies.get("token")?.value || "";
     
        //verify token
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
       

        console.log(decodedToken.id)

        return decodedToken.id;
       

    } catch (error: any) {
        throw new Error(error.message)
    }

}