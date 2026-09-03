import { Router } from "express";
import { userController } from "./users.controller";


const router = Router();

router.post('/', userController.createUser);

export const useRoute = router;