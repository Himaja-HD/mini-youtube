import express from 'express';
import passport from 'passport';

import { registerUser, loginUser, googleLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin); 


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',       
    failureRedirect: '/login',  
  })
);

export default router;
