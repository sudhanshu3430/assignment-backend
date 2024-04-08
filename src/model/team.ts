import mongoose from "mongoose";
import { UserType } from "../shared/types";

const teamSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model<UserType>("Team", teamSchema);
export default Team;
