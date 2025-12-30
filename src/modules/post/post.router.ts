


import express, { Router } from 'express';
import { PostController } from './post.controller';
import auth, { UserROle } from '../../middlewares/auth';

// import {auth as betterAuth} from '../../lib/auth';

const router = express.Router();
// export enum UserROle {
//     USER = "USER",
//     ADMIN = "ADMIN"
// }

// declare global {
//     namespace Express {
//         interface Request{
//             user? :{

//                 id: string;
//                 email: string;
//                 name: string;
//                 role: string;
//                emailVerified: boolean;
//             }
//         }
//     }
// }



// const auth = (...roles: UserROle[]) =>{
//     return async(req: Request, res: Response, next:  NextFunction) => {
// // console.log("middleware!!!!")

// const session = await betterAuth.api.getSession({
//     headers: req.headers as any
// })

// if (!session){
//     return res.status(401).json({
//         success: false,
//         message:"You are nt authorized!"
//     })
// }
// if(!session.user.emailVerified){
//     return res.status(403).json({
//         success: false,
//         message: "Email verification required. Please verify your email"
//     })

// }

// req.user = {
//     id: session.user.id,
//     email: session.user.email,
//     name: session.user.name,
//     role: session.user.role as string,
//     emailVerified: session.user.emailVerified
// }

// if(roles.length && !roles.includes(req.user.role as UserROle)){
// return res.status(403).json({
//         success: false,
//         message: "Forbidden! You don t have permission to access this resources!"
//     })

// }


// next()


// // console.log(session)
//     }
// }




router.post(
    "/",
    auth(UserROle.USER),
    PostController.createPost
)

export const postRouter: Router = router;