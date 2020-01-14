import passport from 'passport';
import { Router } from 'express';
import '../../services/passport';
import UserController from '../../controllers/UserController';
import Validate from '../../middlewares/Validate';
import checkInputDataError from '../../middlewares/checkInputDataError';

const router = Router();
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

/**
 * @swagger
 *
 * /auth/facebook:
 *    get:
 *      summary: User login with facebook account
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          Logged in with facebook successfully
 */
/**
 * @swagger
 *
 * /auth/google:
 *    get:
 *      summary: User login with google account
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          Logged in with facebook successfully
 */
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - token
 *        properties:
 *          access_token:
 *            type: string
 *        example:
 *           access_token: xxxxxxxxx.xxxxxxxxx.xxxxxxxxxx
 *      Comment:
 *        type: object
 *        required:
 *          - comment
 *        properties:
 *          comment:
 *            type: string
 *        example:
 *           comment: This is a simple comment
 *      Token:
 *        type: string
 *        required:
 *          - token
 *        example: xxxxxxxxx.xxxxxxxxx.xxxxxxxxxx
 *        minimum: 1
 *      tripRequestId:
 *        type: integer
*        example: 1
*        minimum: 1
 *
 */


router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook',
    { failureRedirect: process.env.REDIRECT_SOCIAL_AUTH_ERROR_URL }),
  UserController.OAuthfacebook
);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  UserController.OAuthgoogle
);
router.post('/google', Validate.validateSocialLogin(), checkInputDataError, UserController.OAuthgoogle);
module.exports = router;
