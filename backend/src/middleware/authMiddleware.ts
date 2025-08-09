import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/UserSchema.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization || '';
  let token = headers.startsWith('Bearer ') ? headers.slice(7) : null;
  if (!token) {
    token = req.cookies?.accessToken;
  }

  // @ts-ignore
  req.token = token;  // attached to be used in routesControllers
  
  if (req.path === '/api/auth/login' || req.path === '/api/auth/refresh' || req.path === '/api/auth/register') return next(); // Bypass auth if requested to login or refresh route
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    jwt.verify(token, process.env.JWT_SECRET || "enc");
    const user = await User.findOne({ token });
    if (user) {
      // @ts-ignore
      req.user = user;
    }
    else throw new Error("Token not found in db!");
    next();
  } catch (err) {
    if (err && (err as Error).message.includes('expired')){
      // redirect req to refresh route

      return res.clearCookie('authToken').status(403).json({ error: 'Token expired!' });
    } 
    else 
      console.log(err)
      return res.status(401).json({ error: 'Unauthorized! Token verification failed.' });
  }
};