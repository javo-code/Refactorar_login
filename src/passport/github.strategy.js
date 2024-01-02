import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";

const githubStrategyOptions = {
    clientID: "Iv1.5060d94014fb270e",
    clientSecret: "3aa39e156b3891f0a646833a11c312f4ce28ab34",
    callbackURL: "http://localhost:8080/users/github-profile"
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Profile from GitHub:", profile);
        // Resto del código para buscar o registrar al usuario...
    } catch (error) {
        return done(error);
    }
};

passport.use('github', new GithubStrategy(githubStrategyOptions, registerOrLogin));

// Agregamos un middleware para verificar si se está ejecutando la estrategia de Passport para GitHub correctamente
export const ensureAuthenticated = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        console.log('Authenticated user:', user);
        console.log('Error:', err);
        console.log('Info:', info);
        next();
    })(req, res, next);
};
