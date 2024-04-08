import express from "express";
import { param } from "express-validator";
import MyUserController from "../controller/MyUserController";

const router = express.Router();


router.post("/", MyUserController.createUser);
router.get("/", MyUserController.getAllUser);
router.get("/", MyUserController.getAllUserSimple)
router.get("/:first_name", param("first_name")
.isString()
.trim()
.notEmpty()
.withMessage("userName param must be a string"),MyUserController.getUser);
router.delete("/:id", param("id")
.isObject()
.trim()
.notEmpty()
.withMessage("userName param must be a string"),MyUserController.deleteUser);

router.get("/filter", MyUserController.getFilterUser);

export default router