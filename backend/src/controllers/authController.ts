import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/UserSchema.js';
import { sendOTPEmail } from '../services/nodemailer.js';
dotenv.config();

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide your email and password." });
  }
  
  // if db is not accessable 
  if (req == undefined) return res.status(500).json({ error: "Something went wrong!" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "Email not found!" });
  if (!(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Invalid credentials!" });

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
  res.cookie('accessToken', token, {
    httpOnly: true, 
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 15 * 1000,
  });

  res.cookie('refreshToken', token, {

    httpOnly: true, 
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000 * 24 * 30,
  });

  res.status(200).json({user: { userId: user.id, role: user.role }});
};



const register = async (req: Request, res: Response) => {

  const { name, email, password, role } = req.body;
  try {
    console.log('trying to register user')
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Fuck you!Email already exists!" });
  
    const newUser = new User({ name, email, password: await bcrypt.hash(password, 10), role });
    await newUser.save();
  
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || "enc",
      { expiresIn: '1h' }
    );
  
    newUser.token = token;
    await newUser.save();
  
    await sendOTPEmail(newUser.email, newUser.otp?.code || '', newUser.name);
    res.status(200).json({user: { userId: newUser.id, role: newUser.role }});
    
  } catch (error) {
    console.log('db updation failed!', error)
    return res.status(500).json({ error: "Something went wrong!" });
  }
}



const refresh = async (req: Request, res: Response) => {
  //@ts-ignore
  const token = req.accessToken;
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

  try {
    // Fetch user from db
    //@ts-ignore
    const user = await User.findOne({ token: req.accessToken });
    if (!user) {
      return res.clearCookie('accessToken').clearCookie('refreshToken').status(401).json({ error: "Unauthorized! Token is not valid!" });
    }

    // Generate JWT
    const newToken = jwt.sign(
      {userId: user.id, role: user.role},
      process.env.JWT_SECRET || "enc",
      { expiresIn: '1h' }
    );

    await User.updateOne({email: user.email}, {token: newToken});

    // Set token as an HTTP-only cookie
    res.cookie('accessToken', newToken, {
      httpOnly: true, 
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 15 * 1000,
    });
  
    res.status(200).json({token: newToken});

  } catch (error) {
    console.log('db updation failed!')
    return res.status(500).json({ error: "Something went wrong!" });
  }

};



const logout = async (req: Request, res: Response) => {
  // If db is not accessable 
  if (req == undefined) 
    return res.status(500).json({ error: "Something went wrong!" });

  // Fetch user from db
  //@ts-ignore
  const user = await User.findOne({ token: req.accessToken });
  if (!user) {
    res.clearCookie('accessToken').clearCookie('refreshToken').status(401).json({ error: "Unauthorized! Token is not valid!" });
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

  return res.clearCookie('accessToken').clearCookie('refreshToken').status(200).json({message: 'Logged out successfully'});
}


const getUser = async (req: Request, res: Response) => {
  // If db is not accessable 
  if (req == undefined) 
    return res.status(500).json({ error: "Something went wrong!" });

  // Fetch user from db
  //@ts-ignore
  const user = await User.findOne({ token: req.accessToken });
  if (!user) {
    return res.status(401).json({ error: "Unauthorized! Token is not valid!" });
  }

  res.status(200).json({user: { userId: user.id, role: user.role }});
}


const varifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "Email not found!" });
  if (user.otp?.code !== otp) return res.status(401).json({ error: "Invalid OTP!" });
  if (user.otp?.expiresAt && user.otp.expiresAt < new Date()) return res.status(401).json({ error: "OTP expired!" });
  user.otp = { code: '', expiresAt: new Date(), isVerified: true };
  await user.save();

  const token = jwt.sign(
    {userId: user.id, role: user.role},
    process.env.JWT_SECRET || "enc",
    { expiresIn: '1h' }
  );

  res.cookie('accessToken', token, {
    httpOnly: true, 
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 15 * 1000,
  });

  res.cookie('refreshToken', token, {
    httpOnly: true, 
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000 * 24 * 30,
  });

  return res.status(200).json({ message: "OTP verified successfully!", user: { userId: user.id, role: user.role } });
}

export {login, register, refresh, logout, getUser, varifyOTP};