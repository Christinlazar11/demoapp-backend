import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import userRoutes from './routes/userRoute';
import adminRoutes from './routes/adminRoute'
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

// Routes
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes)


app.get('/', (_req, res) => {
  res.send('Learner Licence Application Backend Running');
}); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
