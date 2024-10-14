import User from "../models/user.modal.js";
import bcryptjs from 'bcryptjs' 
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) =>{

const {username, email, password} = req.body;
const hashedPassword = bcryptjs.hashSync(password, 15);
const newUser = new User ({username, email, password: hashedPassword});
try {
    await newUser.save()
res.status(201).json({message: 'User created successfully!'});

} catch (error) {
next(error)}
};


export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if (!validUser) return next(errorHandler(404, 'User not found'))
            const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, 'Wrong credentials!'));
        const token = jwt.sign({userId: validUser._id}, process.env.JWT_SECRET);
        const {password: Pass, ...rest} = validUser._doc;
        res
        .cookie('access_token', token, {httpOnly: true, expiresIn: '1h'})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
        
    }
}