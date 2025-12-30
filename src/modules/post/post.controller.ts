import { Request, Response } from "express";
import { postService } from "./post.service";




const createPost = async (req:Request, res: Response) =>{
    // res.send("Create a new post");
    // console.log({req, res})
    console.log(req.user)

    try {
const user = req.user
if(!user){
  return res.status(400).json({
            error: "Unauthorized",
           
        })  
}

        const result = await postService.createPost(req.body, user.id as string)
        res.status(201).json(result)
        
    }
     catch (e) {
        res.status(400).json({
            error: "post creation failed",
            details: e
        })
    }
}

export const PostController = {
createPost,
}