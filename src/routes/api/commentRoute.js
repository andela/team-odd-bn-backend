import express from 'express';
import Validate from '../../middlewares/Validate';
import checkInputDataError from '../../middlewares/checkInputDataError';
import { commentAccess, CommentExists, isCommentOwner } from '../../middlewares/findUsers';
import Exists from '../../middlewares/Exists';
import isUserVerified from '../../middlewares/isUserVerified';
import verifyToken from '../../middlewares/verifyToken';
import CommentController from '../../controllers/CommentController';

const commentRoute = express.Router();


/**
* @swagger
*
* /trips/{tripRequestId}/comment:
*   post:
*     summary: User or manager can post a comment
*     description: user/manager post comment
*     tags:
*       - Comment
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          $ref: '#/components/schemas/Token'
*      - name: tripRequestId
*        in: path
*        required: true
*        description: Trip request id
*        schema:
*          $ref: '#/components/schemas/tripRequestId'
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       201:
*         description: Comment posted successfully
*       400:
*         description: Unable to post comment
*       401:
*         description: Unauthorized
*       403:
*         description: Only requesters and managers can post comments
*       500:
*         description: Internal server error
*/
commentRoute
  .post(
    '/:tripRequestId/comment',
    verifyToken,
    isUserVerified,
    Validate.commentPostRules(),
    checkInputDataError,
    Exists.isTripRequestExist,
    commentAccess,
    CommentController.createComment
  );


/**
* @swagger
*
* /trips/{tripRequestId}/comments:
*   get:
*     summary: User or manager can get a comment
*     description: user/manager get comment
*     tags:
*       - Comment
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          $ref: '#/components/schemas/Token'
*      - name: tripRequestId
*        in: path
*        required: true
*        description: Trip request id
*        schema:
*          $ref: '#/components/schemas/tripRequestId'
*     responses:
*       200:
*         description: Comments retrieved successfully
*       401:
*         description: Unauthorized
*       403:
*         description: Only requesters and managers can get comments
*       500:
*         description: Internal server error
*/
commentRoute
  .get(
    '/:tripRequestId/comments',
    verifyToken,
    isUserVerified, Validate.getCommentsRules(),
    checkInputDataError,
    Exists.isTripRequestExist,
    commentAccess,
    CommentController.getComments
  );

/**
* @swagger
*
* /trips/delete/{commentId}:
*   delete:
*     summary: User can delete a comment they posted.
*     description: As a user, I should be able to delete a comment I posted relating to a request
*      So, I can ensure that I am conveying the right information.
*     tags:
*       - Comment
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          $ref: '#/components/schemas/Token'
*      - name: commentId
*        in: path
*        required: true
*        description: comment id
*        schema:
*          $ref: '#/components/schemas/commentId'
*     responses:
*       200:
*         description: Comments deleted successfully
*       401:
*         description: Unauthorized
*       403:
*         description: Only owner of the comment can delete
*       500:
*         description: Internal server error
*/
commentRoute
  .delete(
    '/delete/:commentId',
    verifyToken,
    isUserVerified,
    Validate.deleteCommentRules(),
    checkInputDataError,
    isCommentOwner,
    CommentExists,
    CommentController.deleteComment
  );

export default commentRoute;
