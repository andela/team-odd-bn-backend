/* eslint-disable no-underscore-dangle */
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleAuth } from 'passport-google-oauth20';
import UserController from '../controllers/UserController';


dotenv.config();
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.SOCIAL_AUTH_CALLBACK_FACEBOOK_URL,
  profileFields: ['id', 'emails', 'name']
}, UserController.facebookCallBack));

passport.use(new GoogleAuth({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: process.env.SOCIAL_AUTH_CALLBACK_GOOGLE_URL,
}, UserController.googleCallBack));


export default passport;
