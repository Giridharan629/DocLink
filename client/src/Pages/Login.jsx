import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('sign up');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");

  const onSubmitHandler = async (e)=>{
    e.preventDefault();


  }


  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 sm:min-w-[340px] min-w-[96px] rounded-xl text-zinc-600 text-sm shadow-lg border border-gray-100 '>
        <p className='text-2xl font-semibold '>{state === 'sign up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'sign up' ? "sign up" : "login"} to book appointment</p>

        {
          state === "sign up" &&
              <div className='w-full'>
                <p>Full Name</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" value={name} onChange={(e)=>{setname(e.target.value)}} />
              </div>
        }

        <div  className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>

        <button className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state === 'sign up' ? "Create Account" : "Login"}</button>

        {
          state === "sign up" ?
          <p>Already have an account? <span onClick={()=>setState('login')} className=' text-primary underline cursor-pointer'> Login here</span></p> 
          :
          <p>Create an new account ? <span onClick={()=>setState('sign up')} className=' text-primary underline cursor-pointer'> click here</span></p>
        }

      </div>
      
    </form>
  )
}

export default Login