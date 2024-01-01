/* 
App ID: 726447
Client ID: Iv1.f444ccacf572a7f7
Client-secret github: 6a8ce42fbb163d8b23556e7432409afa49380321
*/

import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongoDB/users.dao.js";
const userDao = new UserDao();
import UserServices from "../services/user.services.js";
const userService = new UserServices();

const githubStrategyOptions = {
    clientID: "Iv1.5060d94014fb270e",
    clientSecret: "3aa39e156b3891f0a646833a11c312f4ce28ab34",
    callbackURL: "http://localhost:8080/users/github-profile"
};

const registerOrlogin = async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const email = profile._json.email;
    const user = await userDao.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userService.register({
        first_name: profile._json,
        last_name: profile._json,
        email,
        isGithub: true
    })
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(githubStrategyOptions, registerOrlogin))