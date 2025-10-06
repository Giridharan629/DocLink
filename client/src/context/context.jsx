import { createContext, useContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets copy";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const currencySymbol = '₹';
    const [doctors, setDoctors] = useState([]);

    // const {getAllDoctors} = useContext(admin)

    const getAllDoctors = async ()=>{
        try {

            const {data} = await axios.get(backendUrl + "/api/doctor/all-doctors")

            if(data.success){
                setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {

            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        getAllDoctors()
    })

    const value = {
        doctors,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;