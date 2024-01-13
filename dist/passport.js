"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
var passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
var passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var GOOGLE_ID = process.env.GOOGLE_ID || "";
var GOOGLE_SECRET = process.env.GOOGLE_SECRET || "";
var URL_BASE = process.env.URL_BASE;
var GoogleStrategy = passport_google_oauth20_1.default.Strategy;
function baseProcess(medio) {
    return function (accessToken, refreshToken, profile, done) {
        //console.log("Conectado google",profile)
        var data = {};
        data.name = profile._json.name;
        data.email = profile._json.email;
        data.medio = medio;
        data.id = profile._json.sub;
        console.log(profile);
        done(null, data);
    };
}
var GoogleInstance = new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "".concat(URL_BASE, "/api/google/redirect"),
    scope: ['profile', 'email']
}, baseProcess("Google"));
passport_1.default.serializeUser(function (user, done) { done(null, user); });
passport_1.default.deserializeUser(function (user, done) { done(null, user); });
passport_1.default.use(GoogleInstance);
