import express from 'express'
import { changeAvailability, getAllDoctors } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.post("/change-availability", changeAvailability);
doctorRouter.get("/all-doctors", getAllDoctors)

export default doctorRouter;