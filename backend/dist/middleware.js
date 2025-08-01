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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const UserMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(401).json({
            msg: "No token provided"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(header, process.env.JWT_SECRET);
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({
                msg: "Invalid token"
            });
            return;
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                msg: "Token has expired"
            });
            return;
        }
        else {
            res.status(401).json({
                msg: "Authentication failed"
            });
            return;
        }
    }
};
exports.UserMiddleware = UserMiddleware;
const AdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(header, process.env.JWT_SECRET);
        // @ts-ignore
        const adminId = decoded.adminId;
        // Check if user exists in admin model
        const admin = yield db_1.adminmodel.findById(adminId);
        if (!admin) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Admin access required"
            });
        }
        // @ts-ignore
        req.adminId = adminId;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token has expired"
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            });
        }
    }
});
exports.AdminMiddleware = AdminMiddleware;
