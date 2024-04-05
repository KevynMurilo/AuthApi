import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import ResponseError from "../common/ResponseError";

interface DecodedToken {
  UserId: string;
  email: string;
}

// Estendendo o tipo Request para incluir a propriedade userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json(new ResponseError("Token não fornecido"));
  }

  jwt.verify(token, process.env.SECRETKEY!, (err, decoded) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json(new ResponseError("Token inválido"));
    }

    const decodedToken = decoded as DecodedToken;
    req.userId = decodedToken.UserId; 
    next();
  });
};
