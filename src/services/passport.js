import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import dotenv from 'dotenv';
import User from '../controllers/UserController';

dotenv.config();
passport.use('facebook-token', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET
}, User.facebookCallBack));

passport.use(new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET
}, User.googleCallBack));
