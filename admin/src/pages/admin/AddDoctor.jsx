import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import CircularColor from "../../components/Loader";

const AddDoctor = () => {

  const [loading, setLoading] = useState(false);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician<");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const {atoken, backendUrl} = useContext(AdminContext);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    
    try {
      setLoading(true);

      if(!docImg){
        return toast.error("Image not Selected")
      }

      const formData = new FormData()

      formData.append('image',docImg);
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('experience',experience);
      formData.append('fee',Number(fee));
      formData.append('speciality',speciality);
      formData.append('about',about);
      formData.append('degree',degree);
      formData.append('address',JSON.stringify({line1:address1, line2:address2}));

      // printing form data for debugging
      // formData.forEach((item, key)=>console.log(`${key} : ${item}`))

      const {data} = await axios.post(backendUrl + "/api/admin/add-doctor",formData,{headers:{atoken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName("")
        setPassword("")
        setEmail("")
        setFee("")
        setAbout("")
        setDegree("")
        setAddress1("")
        setAddress2("")
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      
      toast.error(error.message);
      console.log(error)
      
    }finally{
      setLoading(false);
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-[#DADADA] rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className=" flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <div className="max-w-16 max-h-16 overflow-hidden relative group rounded-full">
              <img
                className=" bg-gray-100 rounded-full cursor-pointer opacity-100 group-hover:opacity-50 transition-all duration-300"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
              <img
                className="absolute top-1/2 left-1/2 -translate-1/2 h-1/2 w-fit opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                src={assets.upload_icon}
                alt=""
              />
            </div>
          </label>
          <input
            onChange={(e) => {
              setDocImg(e.target.files[0]);
            }}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 ">
          <div className="w-full lg:flex-1 flex flex-col gap-4 ">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Fees"
                onChange={(e)=>setFee(e.target.value)}
                value={fee}
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                onChange={(e)=>setDegree(e.target.value)}
                value={degree}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Addres line 1"
                onChange={(e)=>setAddress1(e.target.value)}
                value={address1}
                required
              />
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Addres line 2"
                onChange={(e)=>setAddress2(e.target.value)}
                value={address2}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className=" mt-4 mb-2">About Doctor</p>
          <textarea
            className=" w-full px-4 py-2 border rounded"
            placeholder="Write about doctor"
            onChange={(e)=>setAbout(e.target.value)}
            value={about}
            rows={5}
            required
          />
        </div>

        <button className="bg-primary text-white px-10 py-3 mt-4 transition-all   rounded-full">
          {
          loading ?   
          <CircularColor/>
          :
          "Add doctor"
        }
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
