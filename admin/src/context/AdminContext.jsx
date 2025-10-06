import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify';
import axios from 'axios';


export const AdminContext = createContext();

const AdminContextProvider = (props)=>{

    const [atoken, setAtoken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async ()=>{
        try {

            const {data} = await axios.post(backendUrl + "/api/admin/all-doctors",{},{headers : {atoken}})

            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {

            toast.error(error.message);
            
        }
    }

    
  const changeAvilability = async (docId)=>{
    try {

      const {data} = await axios.post(backendUrl + "/api/admin/change-availability",{docId},{headers:{atoken }})

      console.log(data)

      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {

      toast.error(error.message);
            
    }
  }

    const values = {
        atoken, setAtoken,
        backendUrl,
        doctors, getAllDoctors,
        changeAvilability      
    }

    return (
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider