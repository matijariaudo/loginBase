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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.ServerStart = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var connectionBd_1 = __importDefault(require("./connectionBd"));
var router_1 = __importDefault(require("./router"));
var fs = require('fs');
var https = require('https');
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var app = (0, express_1.default)();
exports.app = app;
var ServerStart = function () {
    var port = process.env.PORT || 443;
    console.log("Puerto base", port, process.env.PORT);
    var whiteList = ['http://localhost:3000', 'https://localhost:3000', 'http://localhost:3001', 'https://tarotai-5crc.onrender.com', undefined];
    var privateKey = fs.readFileSync(path_1.default.join(__dirname, '../public/certificates/private-key.pem'), 'utf8');
    var certificate = fs.readFileSync(path_1.default.join(__dirname, '../public/certificates/public-cert.pem'), 'utf8');
    (0, connectionBd_1.default)();
    var corsOptions = {
        origin: function (origin, callback) {
            console.log("Origen:", origin, whiteList.indexOf(origin), whiteList.indexOf("https://tarotai-5crc.onrender.com"));
            if (origin ? whiteList.indexOf(origin) !== -1 : true) {
                // Permite la solicitud si el origen está en la lista blanca o si no se especifica un origen (ej. solicitud local)
                callback(null, true);
            }
            else {
                // Bloquea la solicitud si el origen no está en la lista blanca
                callback(new Error('No permitido por CORS'));
            }
        },
    };
    // Middleware para el análisis de JSON en solicitudes POST
    app.use(express_1.default.json());
    // Ruta de la API JSON (POST) || cors solo para esta ruta del API
    app.use('/api', (0, cors_1.default)(corsOptions), router_1.default);
    // Ruta para servir archivos estáticos desde la carpeta 'public'
    app.use(express_1.default.static(path_1.default.join(__dirname, '../public/build')));
    app.use('/inicio', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, '../public/build/index.html'));
    });
    //const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
    //httpsServer.listen(port, () => {
    app.listen(port, function () {
        console.log("Servidor HTTPS en ejecuci\u00F3n en el puerto ".concat(port));
    });
};
exports.ServerStart = ServerStart;
