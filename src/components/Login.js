import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/reducers/authreducer';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const handleLogin=(e)=>{
    e.preventDefault();
    if(!email?.trim() || !password?.trim()){
        toast.error("Please fill all the fields.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
    }
    
    let body={email,password};
    dispatch(loginUser(body)).then((response)=>{
      if(response.payload&&response.payload.status){
        toast.success("Login successfully!")
        navigate("/addTodo")
      }   
    })
  }
  return (
    <>
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          Log In
        </h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login;