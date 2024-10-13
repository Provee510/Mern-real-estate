import express from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

import mongoose from 'mongoose';

mongoose
.connect(process.env.MONGO)
.then(()=> {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();
app.use(express.json())


app.listen(8000, () =>{
    console.log('Server is running on port 8000!!');
});




app.use('/api/user', UserRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
