import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import { json } from 'express';
import doctorModel from '../models/doctorModel.js';

// api for adding doctor
const addDoctor = async (req, res)=>{
    try {
        
        const {name, email, password, speciality, degree, experience, about, fee, address} = req.body;
        const imageFile = req.file

        if(!name, !email, !password, !speciality, !degree, !experience, !about, !fee, !address){
            return res.json({success:false, message:"Missing details"})
        }

        // validating email
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        // validating strong password
        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(9)
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const image_url = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image : image_url,
            password : hashedPassword,
            speciality,
            degree,
            experience, 
            fee,
            about,
            address : JSON.parse(address),
            date : Date.now(),
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();

        res.json({success:true, message:"Doctor Added"});

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

export {addDoctor}