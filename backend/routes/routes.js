import express from "express";
import { createUser } from "../controllers/userController.js";
import { upload } from "../middleware/useruploadMiddleware.js";


const router = express.Router();

router.post("/", upload.array("documents"), createUser);

export default router;