import express from "express";
import {signUp,Login} from "../controllers/Authcontroller.js";
 
const router = express.Router();//creates an actual router object.//


router.post('/signup',signUp);//adds the route to that router.//
router.post('/login',Login);
export default router;

