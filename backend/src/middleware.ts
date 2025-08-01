import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { adminmodel } from "./db";

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header) {
          res.status(401).json({
            msg: "No token provided"
        });
        return;
    }

    try {
        const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
              res.status(401).json({
                msg: "Invalid token"
                
            });
            return;
        } else if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                msg: "Token has expired"
            });
            return;
        } else {
            res.status(401).json({
                msg: "Authentication failed"
            });
            return;
        }
    }
};

export const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"];

        if (!header) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);
        // @ts-ignore
        const adminId = decoded.adminId;

        // Check if user exists in admin model
        const admin = await adminmodel.findById(adminId);
        
        if (!admin) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Admin access required"
            });
        }

        // @ts-ignore
        req.adminId = adminId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token has expired"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            });
        }
    }
};