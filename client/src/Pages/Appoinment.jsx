import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/context';
import { assets } from '../assets/assets copy';
import RelatedDoctors from '../Components/RelatedDoctors';

const Appoinment = () => {

  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [docInfo, setDocInfo] = useState(null);
  const [docslot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetDocInfo = async ()=>{
    const docInfo = doctors.find(doc => doc._id == docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () =>{
    setDocSlot([]);

    // getting Curr Date
    let today = new Date();

    for(let i = 0; i<7; i++){
      // getting date with index
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      // setting hours
      if(today.getDate === currDate.getDate){
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes( currDate.getHours() > 10 && currDate.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = []

      while(currDate < endTime){
         let formatedTime = currDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})

        // add slots to array
        timeSlots.push({
          dateTime : new Date(currDate),
          time: formatedTime
        })

        // increment curr time by 30 min

        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      setDocSlot (prev => ([...prev, timeSlots]))

    }
  }

  useEffect(()=>{
    fetDocInfo();
  },[doctors, docId]);

  useEffect(()=>{
    getAvailableSlots();
  },[docInfo])

  useEffect(()=>{
    console.log(docslot)
  },[docslot])


  return docInfo && (
    <div>
      {/* ==== DOCTOR DETAILS ===== */}

      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ===== doc infor : name, degree, experience ===== */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* ===== doctor about ===== */}
          <div >
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='textsm
             text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className=' text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees * 84}</span>
            </p>

        </div>
      </div>

      {/* ===== BOOKNG SLOTS===== */}

      <div className=' sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docslot.length && docslot.map((item, index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-5 min-w-16 rounded-full cursor-pointer transition-all ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docslot.length && docslot[slotIndex].map((item, index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'} `} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }

        </div>

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>

      {/*  listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

    </div>
  )
}

export default Appoinment