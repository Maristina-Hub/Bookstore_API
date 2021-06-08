import { Router } from 'express';
import { loginUserController, postUserController } from '../controller/userController.js';


const router = Router()

router.route('/register').get((req, res) => res.json ({message: "I am alive"})).post(postUserController);
router.route('/login').post(loginUserController);


export default router  