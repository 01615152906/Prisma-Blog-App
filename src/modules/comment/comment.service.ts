

import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";




const createComment = async (Payload: {
content: string;
authorId: string;
postId: string;
parentId?:string;
}) =>{

 await prisma.post.findUniqueOrThrow({
    where: {
        id: Payload.postId
    }
})


if (Payload.parentId){
 await prisma.comment.findUniqueOrThrow({
    where: {
        id : Payload.parentId
    }
})
}


return await prisma.comment.create({
    data: Payload
})

console.log("create comment service", Payload)
};

const getCommentById = async (id: string) =>{
    // console.log("comment id : ", commentId)
    return await prisma.comment.findUnique({
        where: {
            id
        },
        //  include : {
        //     post: true
        // }

        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            }
        }

        
    })
};


const getCommentsByAuthor = async (authorId: string) =>{
    // console.log({authorId})

    return await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {createdAt: "desc"},
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })

}


const deleteComment = async(commentId: string, authorId: string)=>{
    // console.log("delete comment")
    // console.log({commentId, authorId})

    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select:{
            id: true
        }
    })
    // console.log(commentData)
    if(!commentData){
        throw new Error('Your provided input is invalid !')
    }

return await prisma.comment.delete({
    where: {
        id: commentData.id
    }
})

}



// authorId, commentId, updatedData
const updateComment = async (commentId: string, data: { content?: string, status?: CommentStatus }, authorId: string) => {
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    if (!commentData) {
        throw new Error("Your provided input is invalid!")
    }

    return await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data
    })
}



export const CommentService ={
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
    updateComment

}

