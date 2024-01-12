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
var crypt_1 = require("./crypt");
var jwt_1 = require("./jwt");
var passport_1 = require("./passport");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var JWTpass = process.env.JWT || '';
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
var middleSession = function (req, res, next) {
    if (!('user' in req.session)) {
        // Haz algo si el usuario no está autenticado
        console.log(req.session);
    }
    next();
};
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
router.post('/token', middleSession, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, id, user, newToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                return [4 /*yield*/, (0, jwt_1.validateAndDecodeJWT)(token, JWTpass)];
            case 1:
                id = _a.sent();
                if (!id) {
                    return [2 /*return*/, res.json({ status: false })];
                }
                return [4 /*yield*/, userDB_1.default.findById(id.id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ status: false })];
                }
                return [4 /*yield*/, (0, jwt_1.generateJWT)({ id: user._id }, JWTpass, '1h')];
            case 3:
                newToken = _a.sent();
                console.log(user);
                return [2 /*return*/, res.json({ status: true, user: user, token: newToken })];
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
router.get('/logingoogle', passport_1.passport.authenticate("google"));
router.get('/:medio/redirect', function (req, res, next) {
    var medio = req.params.medio;
    var medios = ["facebook", "google"];
    if (medios.indexOf(medio) < 0) {
        return res.send("No encontrado");
    }
    passport_1.passport.authenticate(medio, { failureRedirect: '/login-failed' })(req, res, next);
}, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, id, medio, user, idbase, newUser, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, name = _a.name, email = _a.email, id = _a.id, medio = _a.medio;
                return [4 /*yield*/, userDB_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                idbase = "";
                if (!user) return [3 /*break*/, 2];
                idbase = user._id;
                return [3 /*break*/, 4];
            case 2:
                newUser = new userDB_1.default({ name: name, email: email, password: "xxxxxx" });
                return [4 /*yield*/, newUser.save()];
            case 3:
                _b.sent();
                idbase = newUser._id;
                _b.label = 4;
            case 4: return [4 /*yield*/, (0, jwt_1.generateJWT)({ "id": idbase }, JWTpass, '1h')];
            case 5:
                token = _b.sent();
                return [2 /*return*/, res.redirect("../../?token=".concat(token))];
        }
    });
}); });
exports.default = router;
