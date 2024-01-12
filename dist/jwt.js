"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndDecodeJWT = exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Función para generar un JWT
function generateJWT(payload, secretKey, expiresIn) {
    try {
        // Genera el token utilizando el payload, clave secreta y opciones de expiración
        var token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expiresIn });
        return token;
    }
    catch (error) {
        console.error('Error al generar el token JWT:', error);
        return null;
    }
}
exports.generateJWT = generateJWT;
// Función para validar y decodificar un token JWT
function validateAndDecodeJWT(token, secretKey) {
    try {
        // Verifica y decodifica el token utilizando la clave secreta
        var decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        return decodedToken;
    }
    catch (error) {
        console.error('Error al validar y decodificar el token JWT:', error);
        return null;
    }
}
exports.validateAndDecodeJWT = validateAndDecodeJWT;
