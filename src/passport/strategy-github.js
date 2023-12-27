/* 
App ID: 726447
Client ID: Iv1.f444ccacf572a7f7
Client-secret github: 6a8ce42fbb163d8b23556e7432409afa49380321
*/

import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserController from "../controllers/users.controller.js";
const controller = new UserController();

const strategyOptions = {
    clientID: "Iv1.5060d94014fb270e",
    clientSecret: "3aa39e156b3891f0a646833a11c312f4ce28ab34",
    callbackURL: "http://localhost:8080/users/profile"
};

const registerOrlogin = async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
}

passport.use('github',  new GithubStrategy(strategyOptions, registerOrlogin))