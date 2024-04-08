import mongoose from "mongoose";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
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

const User = mongoose.model<UserType>("User", userSchema);
export default User;
