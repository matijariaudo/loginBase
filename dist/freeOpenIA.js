"use strict";
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
exports.FreeiA = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var FreeiA = function (search) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, solicitud, textareaElement, parentElementFinded, buttonSend, stretchButtonText, encontrado, groupElements, secondGroupText, groupSelectors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                // Set the viewport's width and height
                return [4 /*yield*/, page.setViewport({ width: 600, height: 400 })];
            case 3:
                // Set the viewport's width and height
                _a.sent();
                return [4 /*yield*/, page.goto('https://openchat.team/en')];
            case 4:
                _a.sent();
                //const element = await page.waitForSelector('textarea');
                return [4 /*yield*/, page.waitForSelector('textarea.m-0')];
            case 5:
                //const element = await page.waitForSelector('textarea');
                _a.sent();
                solicitud = search;
                return [4 /*yield*/, page.type('textarea.m-0', solicitud)];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.$('textarea.m-0')];
            case 7:
                textareaElement = _a.sent();
                return [4 /*yield*/, textareaElement.$x('..')];
            case 8:
                parentElementFinded = _a.sent();
                return [4 /*yield*/, parentElementFinded[0].$$('button')];
            case 9:
                buttonSend = _a.sent();
                // Hacer clic en el botón encontrado
                return [4 /*yield*/, buttonSend[1].click()];
            case 10:
                // Hacer clic en el botón encontrado
                _a.sent();
                stretchButtonText = "";
                encontrado = false;
                secondGroupText = "";
                groupSelectors = '.group';
                _a.label = 11;
            case 11:
                if (!!encontrado) return [3 /*break*/, 17];
                groupSelectors = '.group';
                return [4 /*yield*/, page.$$(groupSelectors)];
            case 12:
                groupElements = _a.sent();
                if (!(groupElements.length >= 2)) return [3 /*break*/, 16];
                return [4 /*yield*/, page.waitForSelector("".concat(groupSelectors, ":nth-child(2)"), { visible: true })];
            case 13:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function (element) { return element.innerText; }, groupElements[1])];
            case 14:
                secondGroupText = _a.sent();
                return [4 /*yield*/, page.$eval('.stretch button:nth-of-type(1)', function (element) { return element.textContent; })];
            case 15:
                stretchButtonText = _a.sent();
                if (stretchButtonText.trim() != "Stop Generating" && stretchButtonText != "") {
                    encontrado = true;
                }
                _a.label = 16;
            case 16: return [3 /*break*/, 11];
            case 17:
                browser.close();
                return [2 /*return*/, secondGroupText];
        }
    });
}); };
exports.FreeiA = FreeiA;
