import { Router } from "express";
import {adminLogin} from '../controllers/login';

const router = Router();

router.post("/",adminLogin);

export default router;