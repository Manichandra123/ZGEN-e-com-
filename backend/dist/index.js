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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const saltRounds = 10;
app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const signupSchema = zod_1.z.object({
            username: zod_1.z.string().min(3).max(20),
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6).max(20),
        });
        const validateData = signupSchema.safeParse(req.body);
        if (!validateData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
                errors: validateData.error.errors
            });
            return;
        }
        const existingUser = yield db_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            });
            return;
        }
        const passwordhash = yield bcrypt_1.default.hash(password, saltRounds);
        const Newuser = yield db_1.UserModel.create({
            username,
            email,
            password: passwordhash
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: Newuser._id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
app.post("/api/v1/admin/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminName = req.body.adminName;
        const email = req.body.email;
        const password = req.body.password;
        const signupSchema = zod_1.z.object({
            adminName: zod_1.z.string().min(3).max(20),
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6).max(20),
        });
        const validateData = signupSchema.safeParse(req.body);
        if (!validateData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
                errors: validateData.error.errors
            });
            return;
        }
        const passwordhash = yield bcrypt_1.default.hash(password, saltRounds);
        const newAdmin = yield db_1.adminmodel.create({
            adminName,
            email,
            password: passwordhash
        });
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            adminId: newAdmin._id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const signinSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6).max(20),
        });
        const validateData = signinSchema.safeParse(req.body);
        if (!validateData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
                errors: validateData.error.errors
            });
            return;
        }
        const user = yield db_1.UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            userId: user._id,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
app.post('/api/v1/admin/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const signinSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6).max(20),
        });
        const validateData = signinSchema.safeParse(req.body);
        if (!validateData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
                errors: validateData.error.errors
            });
            return;
        }
        const admin = yield db_1.adminmodel.findOne({ email });
        if (!admin) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!passwordMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ adminId: admin._id }, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            message: "Admin signed in successfully",
            adminId: admin._id,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
app.post('/api/v1/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const images = req.body.images;
    const stock = req.body.stock;
    const products = yield db_1.ProductModel.create({
        name: name,
        description: description,
        price: price,
        category: category,
        images: images,
        stock: stock,
        //@ts-ignore
    });
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: products
    });
}));
app.get('/api/v1/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.ProductModel.find();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: products
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
app.delete('/api/v1/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params;
    try {
        const product = db_1.ProductModel.findByIdAndDelete(productId.id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        app.listen(process.env.PORT, () => __awaiter(this, void 0, void 0, function* () {
            console.log(" you are listed on port :3000");
        }));
    });
}
main();
