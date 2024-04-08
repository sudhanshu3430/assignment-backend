import Team from "../model/team";
import { UserType } from "../shared/types";
import { Request, Response } from "express";

const createTeam = async (req: Request, res: Response) => {
  try {
    const { email }: { email: string } = req.body; // Extract email from request body
    const existingUser = await Team.findOne({ email }); // Search for user by email

    if (existingUser) {
        return res.status(200).send("User already exists");
    }

    const newTeam: UserType = req.body;
    const createdTeam = new Team(newTeam);
    await createdTeam.save();
    res.status(201).json(createdTeam.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating User" });
  }
};

const getTeam = async (req: Request, res: Response) => {
    try {
      const teamData = await Team.find(); // Fetch all documents from the Team collection
      res.json(teamData); // Respond with the fetched team data
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

export default {
  createTeam,
  getTeam,
};
