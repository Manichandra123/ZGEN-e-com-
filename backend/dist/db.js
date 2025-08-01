"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ProductModel = exports.adminmodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userShchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 20 }
});
// models/Product.js
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [
        {
            url: { type: String, required: true },
            alt: { type: String, default: '' }
        }
    ],
    stock: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const AdminSchema = new mongoose_1.default.Schema({
    adminName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6, max: 20 }
});
exports.adminmodel = mongoose_1.default.model("Admin", AdminSchema);
exports.ProductModel = mongoose_1.default.model('Product', productSchema);
exports.UserModel = mongoose_1.default.model("User", userShchema);
