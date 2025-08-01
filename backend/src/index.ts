import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";
 
import cors from "cors";

import { UserModel , adminmodel , ProductModel } from "./db";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const saltRounds = 10;

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.post("/api/v1/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const signupSchema = z.object({
            username: z.string().min(3).max(20),
            email: z.string().email(),
            password: z.string().min(6).max(20),
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

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            });
            return;
        }

        const passwordhash = await bcrypt.hash(password, saltRounds);

        const Newuser = await UserModel.create({
            username,
            email,
            password: passwordhash
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: Newuser._id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post("/api/v1/admin/signup", async (req, res) => {
    try {
        const adminName = req.body.adminName;
        const email = req.body.email;
        const password = req.body.password;
        const signupSchema = z.object({
            adminName: z.string().min(3).max(20),
            email: z.string().email(),
            password: z.string().min(6).max(20),
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

        const passwordhash = await bcrypt.hash(password, saltRounds);

        const newAdmin = await adminmodel.create({
            adminName,
            email,
            password: passwordhash
        });
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            adminId: newAdmin._id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post('/api/v1/signin', async(req , res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const signinSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6).max(20),
        })
        const validateData = signinSchema.safeParse(req.body);
        if(!validateData.success){
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
                errors: validateData.error.errors
            });
            return;
        }
        const user = await UserModel .findOne({email});
        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found"
            });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET as string);
        if(token){
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            userId: user._id,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post('/api/v1/admin/signin', async(req , res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const signinSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6).max(20),
        })
        const validateData = signinSchema.safeParse(req.body);
        if(!validateData.success){
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
                errors: validateData.error.errors
            });
            return;
        }
        const admin = await adminmodel.findOne({email});
        if(!admin){
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if(!passwordMatch){
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }

        const token = jwt.sign({adminId: admin._id},process.env.JWT_SECRET as string);
        res.status(200).json({
            success: true,
            message: "Admin signed in successfully",
            adminId: admin._id,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post('/api/v1/products', async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const images = req.body.images;
    const stock = req.body.stock;

    const products = await ProductModel.create({
        name: name,
        description: description,
        price: price,
        category: category,
        images: images,
        stock: stock,
        //@ts-ignore
    })
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: products
    })
});



app.get('/api/v1/products', async (req, res) => {
    try {
        const products = await ProductModel.find()   
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: products
        }) 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

app.delete('/api/v1/products/:id', async (req, res) => {
   const productId = req.params
   try{
    const product = ProductModel.findByIdAndDelete(productId.id);
    if(!product){
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
   } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
   }
});
 

async function main() {
    await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    app.listen(process.env.PORT as string, async () => {
      console.log(" you are listed on port :3000");
    });
}
main();

