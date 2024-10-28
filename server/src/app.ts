import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/authRoutes';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import cors from 'cors';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());

dotenv.config();

// Routes
app.use('/auth', authRoutes);

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

export default app;
