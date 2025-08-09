import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/UserSchema.js';
dotenv.config();

const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Validate required fields
  if (!email) {
    return res
      .status(400)
      .json({ error: "Please provide your email." });
  }
  
  // if db is not accessable 
  if (req == undefined) return res.status(500).json({ error: "Something went wrong!" });

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "Email not found!" });

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET || "enc",
    { expiresIn: '1h' }
  );

  user.token = token;
  await user.save();
  try {

    // fs.writeFileSync(seedPath, JSON.stringify(req, null, 2), 'utf-8');
  } catch (error) {
    console.log('db updation failed!')
    return res.status(500).json({ error: "Something went wrong!" });
  }

  // Set token as an HTTP-only cookie
  res.cookie('authToken', token, {
    httpOnly: true, 
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({user: { userId: user.id, role: user.role }});
};



const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  jwt.verify(token, process.env.JWT_SECRET || "enc", (err: any, decoded: any) => {
    if (err && (err as Error).message.includes('expired')) {
      console.log("Token expired!"); // if token is expired then just log it and continue 
    }
    else if (err) { // if there is any other error such as secret key mismatch then return
      console.log(err)
      return res.status(401).json({ error: 'Unauthorized! Token verification failed.' });
    }
  });

  // If db is not accessable 
  if (req == undefined) 
    return res.status(500).json({ error: "Something went wrong!" });

  // Fetch user from db
  const user = await User.findOne({ token });
  if (!user) {
    return res.clearCookie('authToken').status(401).json({ error: "Unauthorized! Token is not valid!" });
  }

  // Generate JWT
  const newToken = jwt.sign(
    {userId: user.id, role: user.role},
    process.env.JWT_SECRET || "enc",
    { expiresIn: '1h' }
  );

  // updating DB for token
  user.token = newToken;
  await user.save();
  try {
    // fs.writeFileSync(seedPath, JSON.stringify(req, null, 2), 'utf-8');
  } catch (error) {
    console.log('db updation failed!')
    return res.status(500).json({ error: "Something went wrong!" });
  }

  // Set token as an HTTP-only cookie
  res.cookie('authToken', newToken, {
    httpOnly: true, 
    secure: true,
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({token: newToken});
};



const logout = async (req: Request, res: Response) => {
  // If db is not accessable 
  if (req == undefined) 
    return res.status(500).json({ error: "Something went wrong!" });

  // Fetch user from db
  const user = await User.findOne({ token: req.cookies.authToken });
  if (!user) {
    res.clearCookie('authToken').status(401).json({ error: "Unauthorized! Token is not valid!" });
    return
  }
  
  user.token = '';
  await user.save();
  try {
    // fs.writeFileSync(seedPath, JSON.stringify(req, null, 2), 'utf-8');
  } catch (error) {
    console.log('db updation failed!')
    return res.status(500).json({ error: "Something went wrong!" });
  }

  return res.clearCookie('authToken').status(200).json({message: 'Logged out successfully'});
}


const getUser = async (req: Request, res: Response) => {
  // If db is not accessable 
  if (req == undefined) 
    return res.status(500).json({ error: "Something went wrong!" });

  // Fetch user from db
  const user = await User.findOne({ token: req.cookies.authToken });
  if (!user) {
    return res.status(401).json({ error: "Unauthorized! Token is not valid!" });
  }

  res.status(200).json({user: { userId: user.id, role: user.role }});
}

export {login, refresh, logout, getUser};