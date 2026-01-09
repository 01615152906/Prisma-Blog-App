

import express, { Router } from 'express';
import { CommentController } from './comment.controller';
import auth, { UserROle } from '../../middlewares/auth';

const router = express.Router();

router.get(
    "/author/:authorId",
    CommentController.getCommentsByAuthor
)

router.get(
    "/:commentId",
    CommentController.getCommentById
)

router.post(
    "/",
    auth(UserROle.ADMIN, UserROle.USER),
    CommentController.createComment
)


router.delete(
    "/:commentId",
       auth(UserROle.ADMIN, UserROle.USER),
    CommentController.deleteComment
)


router.patch(
    "/:commentId",
    auth(UserROle.ADMIN, UserROle.USER),
    CommentController.updateComment
)

router.patch(
    "/:commentId/moderate",
    auth(UserROle.ADMIN, UserROle.USER),
    CommentController.moderateComment
)


export const commentRouter: Router = router;