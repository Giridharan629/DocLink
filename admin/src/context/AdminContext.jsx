import { createContext, useEffect, useState } from "react";


export const AdminContext = createContext();

const AdminContextProvider = (props)=>{

    const [atoken, setAtoken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const values = {
        atoken, setAtoken,
        backendUrl,

        
    }

    return (
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider