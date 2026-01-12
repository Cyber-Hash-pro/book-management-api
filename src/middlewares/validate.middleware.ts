import type { ZodType } from "zod";
import  type { Request, Response, NextFunction } from "express";

export const validate =
  (schema:ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // validate & sanitize
      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors
      });
    }
  };
