import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorsList = () => {

  const {doctors, atoken, getAllDoctors, changeAvilability} = useContext(AdminContext)

  useEffect(()=>{
    if(atoken){
      getAllDoctors()
    }
  },[atoken])


  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index)=>(
            <div className='border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-teal-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4 '>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm '>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onClick={()=>{changeAvilability(item._id)}} type="checkbox" checked={item.available} id="" />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList