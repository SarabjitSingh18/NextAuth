import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //hashing the given token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);


        //checks if the user is verified or not
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: new Date(Date.now() + 3600000) 
                    }

                }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                   $set:{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry:  new Date(Date.now() + 3600000)
                   }
                })
        }
        //we are using the mailTrap as a service for sending emails
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b3df5bb2e7e8eb",//we will place it here using env file for better security
                pass: "8b47ebc162925f"//we will place it here using env file for better security
            }
        });
        //mail options are the options that are placed in the transporter
        const mailOptions = {
            from: 'sarabjit@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

        }
        //sending the mailResponse
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }

}
