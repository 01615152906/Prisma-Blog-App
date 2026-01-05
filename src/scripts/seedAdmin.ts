import { prisma } from "../lib/prisma"
import { UserROle } from "../middlewares/auth"






async function seedAdmin() {

try {
    console.log("******* Admin Seeding Started ....")
    const adminData = {
        name: "Admin3 saheb",
        email: "aman3.me@gmail.com",
        role: UserROle.ADMIN,
        password: "admin12345"
    }

console.log("******** Checking Admin Exist or not")
    const existingUser =  await prisma.user.findUnique({
        where: {
            email:adminData.email
        }
    });

    if(existingUser){
        throw new Error("User already exists in ")
    }


    const signUpAdmin =  await fetch("http://localhost:3000/api/auth/sign-up/email",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adminData)
    })


if(signUpAdmin.ok){
    console.log("******* Admin created")
    await prisma.user.update({
        where: {
            email: adminData.email
        },
        data: {
            emailVerified: true
        }
    })

console.log("******** Email verification status updated")

}

console.log("****** SUCCESS ***********")


    // console.log(signUpAdmin)
} 
catch (error) {
    console.error(error)
}

    
}


seedAdmin()



