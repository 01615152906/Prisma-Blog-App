

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user:process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

      trustedOrigins: [process.env.APP_URL!],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },




      emailAndPassword: { 
    enabled: true, 
    autoSignIn: false,
    requireEmailVerification: true
  }, 

emailVerification: {

sendOnSignUp:true,
autoSignInAfterVerification: true,

    sendVerificationEmail: async ( { user, url, token }, request) => {
const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
        // console.log({user, url, token})
try {
    
  const info = await transporter.sendMail({
    from: '"prisma Blog" <prismablog@gmail.com.email>',
    to: user.email,
    subject: "Please verify your email",
   
    html:  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f2f4f7; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 10px;">

        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#111827; padding:24px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:1px;">
                Prisma Blog
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin-top:0; color:#111827;">
                Verify your email address 
              </h2>

              <p style="color:#4b5563; font-size:15px; line-height:1.6;">
                Thanks for creating an account with <strong>Prisma Blog ${user.name}</strong>.
                To complete your registration, please verify your email address by clicking the button below.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:36px 0;">
                <a href="${verificationUrl}"
                   style="background:#2563eb; color:#ffffff; text-decoration:none; padding:14px 34px;
                          font-size:16px; border-radius:8px; display:inline-block; font-weight:bold;">
                  Verify Email
                </a>
              </div>

              <p style="color:#6b7280; font-size:14px;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="background:#f9fafb; padding:12px; border-radius:6px; font-size:13px; color:#2563eb; word-break:break-all;">
                ${url}
              </p>

              <p style="margin-top:30px; color:#9ca3af; font-size:13px;">
                If you didn’t create this account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; text-align:center; padding:16px; font-size:12px; color:#9ca3af;">
              © ${new Date().getFullYear()} Prisma Blog. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
` // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
} 


catch (err) {
   console.error(err) 
   throw err;
}
    },
  },



  socialProviders: {
        google: { 
             accessType: "offline", 
         prompt: "select_account consent", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

});

