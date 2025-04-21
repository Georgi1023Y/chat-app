import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "GOOGLE_CLIENT_ID",
      clientSecret: "GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:5001/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile); 
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: "GITHUB_CLIENT_ID",
      clientSecret: "GITHUB_CLIENT_SECRET",
      callbackURL: "http://localhost:5001/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile); 
    }
  )
);
