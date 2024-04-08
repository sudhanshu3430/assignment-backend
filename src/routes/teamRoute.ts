import express from "express";

import MyTeamController from "../controller/MyTeamController";

const router = express.Router();

router.post("/", MyTeamController.createTeam);
router.get("/", MyTeamController.getTeam);

export default router