"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userDB_1 = __importDefault(require("./userDB"));
var express_validator_1 = require("express-validator");
var google_auth_library_1 = require("google-auth-library");
var https_1 = __importDefault(require("https"));
var crypt_1 = require("./crypt");
var jwt_1 = require("./jwt");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var router = express_1.default.Router();
// Middleware de validación de datos para el alta de usuario
var validateUserData = [
    (0, express_validator_1.body)('nombre').notEmpty().isString(),
    (0, express_validator_1.body)('apellido').notEmpty().isString(),
    (0, express_validator_1.body)('password').notEmpty().isString().isLength({ min: 6 }).matches(/[!@#$%^&*(),.?":{}|<>]/),
    (0, express_validator_1.body)('fechaNacimiento').notEmpty().isISO8601(),
    (0, express_validator_1.body)('telefono').notEmpty().isString(),
    (0, express_validator_1.body)('email').notEmpty().isEmail(),
];
// Ruta para crear un nuevo usuario (Alta)
router.post('/alta', validateUserData, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, _a, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                userData = req.body;
                _a = userData;
                return [4 /*yield*/, (0, crypt_1.hashPassword)(userData.password)];
            case 1:
                _a.password = _b.sent();
                newUser = new userDB_1.default(userData);
                return [4 /*yield*/, newUser.save()];
            case 2:
                _b.sent();
                res.status(201).json(newUser);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: 'Error al crear el usuario', error: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Ruta para obtener todos los usuarios
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.body.status || true;
                console.log("buscando todos");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userDB_1.default.find({ status: status })];
            case 2:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Error al obtener los usuarios' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Ruta para actualizar un usuario por ID (Modificación)
router.put('/:id', validateUserData, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, updatedUserData, _a, updatedUser, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                userId = req.params.id;
                updatedUserData = req.body;
                if (!updatedUserData.password) return [3 /*break*/, 2];
                _a = updatedUserData;
                return [4 /*yield*/, (0, crypt_1.hashPassword)(updatedUserData.password)];
            case 1:
                _a.password = _b.sent();
                _b.label = 2;
            case 2:
                console.log(updatedUserData);
                return [4 /*yield*/, userDB_1.default.findByIdAndUpdate(userId, updatedUserData, { new: true })];
            case 3:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'Usuario no encontrado' })];
                }
                res.json(updatedUser);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res.status(500).json({ message: 'Error al actualizar el usuario', error: error_3 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/session', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, cont, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userDB_1.default.findOne({ email: email }).select('+password')];
            case 2:
                user = _b.sent();
                console.log(user);
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'Usuario no encontrado' })];
                }
                return [4 /*yield*/, (0, crypt_1.validatePassword)(password, user.password)];
            case 3:
                cont = _b.sent();
                // Verifica la contraseña (debes implementar la lógica de hash y comparación de contraseñas)
                if (!cont) {
                    return [2 /*return*/, res.status(401).json({ error: 'Contraseña incorrecta' })];
                }
                return [4 /*yield*/, (0, jwt_1.generateJWT)({ "id": user._id }, 'MATIAS', '1h')];
            case 4:
                token = _b.sent();
                // Iniciar sesión con éxito, puedes generar un token JWT aquí si es necesario
                return [2 /*return*/, res.status(200).json({ message: 'Inicio de sesión exitoso', user: user, token: token })];
            case 5:
                error_4 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: error_4 })];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Ruta para eliminar un usuario por ID (Baja)
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, deletedUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.id;
                return [4 /*yield*/, userDB_1.default.findByIdAndDelete(userId)];
            case 1:
                deletedUser = _a.sent();
                if (!deletedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'Usuario no encontrado' })];
                }
                res.json(deletedUser);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ message: 'Error al eliminar el usuario' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/google', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oauth, token, options, req_1, client, ticket, jsonData, user, message, userData, newUser, newtoken, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                oauth = req.body.oauth || false;
                token = req.body.id_token;
                if (!oauth) return [3 /*break*/, 1];
                options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                console.log("https://www.googleapis.com/oauth2/v2/userinfo?access_token=".concat(token));
                req_1 = https_1.default.request("https://www.googleapis.com/oauth2/v2/userinfo?access_token=".concat(token), options, function (res1) {
                    var data = '';
                    // Escucha el evento 'data' para recibir los datos de la respuesta
                    res1.on('data', function (chunk) {
                        data += chunk;
                    });
                    // Escucha el evento 'end' para finalizar la solicitud
                    res1.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var jsonData, user, message, userData, newUser, newtoken, error_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    jsonData = JSON.parse(data);
                                    console.log('Datos obtenidos:', jsonData);
                                    return [4 /*yield*/, userDB_1.default.findOne({ email: jsonData.email })];
                                case 1:
                                    user = _a.sent();
                                    message = 'Se ha iniciado sesión';
                                    if (!!user) return [3 /*break*/, 4];
                                    userData = {};
                                    userData.email = jsonData.email;
                                    userData.telefono = "";
                                    userData.nombre = jsonData.given_name;
                                    ;
                                    userData.apellido = jsonData.family_name;
                                    userData.password = "no_password";
                                    userData.telefono = "no_phone";
                                    userData.fechaNacimiento = new Date();
                                    newUser = new userDB_1.default(userData);
                                    return [4 /*yield*/, newUser.save()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, userDB_1.default.findOne({ email: jsonData.email })];
                                case 3:
                                    user = (_a.sent());
                                    message = 'Se ha creado nuevo usuario';
                                    _a.label = 4;
                                case 4: return [4 /*yield*/, (0, jwt_1.generateJWT)({ "id": user._id }, 'MATIAS', '1h')];
                                case 5:
                                    newtoken = _a.sent();
                                    // Iniciar sesión con éxito, puedes generar un token JWT aquí si es necesario
                                    return [2 /*return*/, res.status(200).json({ message: message, user: user, token: newtoken })];
                                case 6:
                                    error_7 = _a.sent();
                                    console.error('Error al analizar los datos JSON:', error_7);
                                    return [2 /*return*/, res.status(200).json({ data: "error", error: error_7 })]; // Devuelve un mensaje de error JSON aquí
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                req_1.on('error', function (error) {
                    console.error('Error en la solicitud:', error);
                    return res.status(200).json({ data: "error", error: error }); // Devuelve un mensaje de error JSON aquí
                });
                // Finaliza la solicitud
                req_1.end();
                return [3 /*break*/, 10];
            case 1:
                client = new google_auth_library_1.OAuth2Client();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 9, , 10]);
                return [4 /*yield*/, client.verifyIdToken({
                        idToken: token,
                        audience: process.env.GOOGLE_ID_CLIENTE, // Specify the CLIENT_ID of the app that accesses the backend
                    })];
            case 3:
                ticket = _a.sent();
                console.log("payload", ticket);
                jsonData = ticket.getPayload();
                console.log(jsonData);
                return [4 /*yield*/, userDB_1.default.findOne({ email: jsonData.email })];
            case 4:
                user = _a.sent();
                message = 'Se ha iniciado sesión';
                if (!!user) return [3 /*break*/, 7];
                userData = {};
                userData.email = jsonData.email;
                userData.telefono = "";
                userData.nombre = jsonData.given_name;
                ;
                userData.apellido = jsonData.family_name;
                userData.password = "no_password";
                userData.telefono = "no_phone";
                userData.fechaNacimiento = new Date();
                newUser = new userDB_1.default(userData);
                return [4 /*yield*/, newUser.save()];
            case 5:
                _a.sent();
                return [4 /*yield*/, userDB_1.default.findOne({ email: jsonData.email })];
            case 6:
                user = (_a.sent());
                message = 'Se ha creado nuevo usuario';
                _a.label = 7;
            case 7: return [4 /*yield*/, (0, jwt_1.generateJWT)({ "id": user._id }, 'MATIAS', '1h')];
            case 8:
                newtoken = _a.sent();
                // Iniciar sesión con éxito, puedes generar un token JWT aquí si es necesario
                return [2 /*return*/, res.status(200).json({ message: message, user: user, token: newtoken })];
            case 9:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(200).json({ 'data': "error", error: error_6 })];
            case 10: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
