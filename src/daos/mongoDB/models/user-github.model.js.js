import { Schema, model } from "mongoose";

const userGithubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String
  }
/*
  isGithub: {
    type: Boolean,
    default: true
  } 
  */
});

export const UserModel = model("usersGithub", userGithubSchema);
