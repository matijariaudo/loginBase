import passportGoogle from "passport-google-oauth20";
import passport from "passport";
import {config} from "dotenv"
config()

const GOOGLE_ID=process.env.GOOGLE_ID||"";
const GOOGLE_SECRET=process.env.GOOGLE_SECRET||"";
const URL_BASE=process.env.URL_BASE;
const GoogleStrategy = passportGoogle.Strategy;

function baseProcess(medio:string){
    return function (accessToken:string, refreshToken:string, profile:passportGoogle.Profile, done:passportGoogle.VerifyCallback){
        //console.log("Conectado google",profile)
        let data:{name?:string,email?:string,id?:string,medio?:string}={};
        data.name=profile._json.name;
        data.email=profile._json.email;
        data.medio=medio
        data.id=profile._json.sub;
        console.log(profile)
        done(null,data)
    }
}

const GoogleInstance=new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: `${URL_BASE}/api/google/redirect`,
      scope: [ 'profile','email' ]
    },
    baseProcess("Google")
)


passport.serializeUser((user, done) => {done(null, user);});
passport.deserializeUser((user:any, done) => {done(null, user);});
passport.use(GoogleInstance)

export {passport}