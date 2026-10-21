import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//logic behind signup//
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body; //we will give this three in body when we will check api//
    // check if user already exists//
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user email already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashPassword });

    res.status(200).json({ message: "SignUp Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error }); // at 500 server error show in json format and return wht is the error with th help of error //
  }
};
 
//logic behind Login//
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    //Compare password//
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400) .json({ message: "login failed" });
    }
    const token = jwt.sign({ id: user._id }, 
        process.env.JWT_SECRET, {
        expiresIn: "7d", 
    });
    res.json({message:"login successfully" ,token,
        user:{
            id:User.id,
            name: User.nsmae,
            password:User.password
        }
    })
  } catch (error) {
    res.status(500).json({ message: "Error occur", error });
  }
};
 
