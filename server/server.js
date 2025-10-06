import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongoConfig.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRout.js';
import doctorRouter from './routes/doctorRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints

// localhost:4000/api/admin/add-doctor
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter)

app.get('/', (req, res)=>{
    res.send("API WORKING")
})


app.listen(port, ()=>{
    console.log("Server started ",port)
})