import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';



// export const middle_register = (req: Request, res: Response, next: NextFunction) => {
//     const { username, email, password } = req.body;

//     next();
// };

// export const middle_login = (req: Request, res: Response, next: NextFunction) => {
//     const { username, password } = req.body;
//     next();
// };