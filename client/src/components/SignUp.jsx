import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useProductContext } from "../context/productContext";


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const { API, toast } = useProductContext()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/api/user/register', { name, email, password })
      const { token } = response?.data?.data

      localStorage.setItem('token', token)
      navigate('/')
      toast.success(response?.data?.message)
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log("error in signup: ", error)
      toast.error(error.response?.data?.message || "User signup failed")
      setName('')
      setEmail('')
      setPassword('')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full px-6 py-8 rounded-lg">
        <h2 className="text-2xl font-normal text-center text-gray-800 mb-6 font-serif">
          Sign Up<span className="mx-2">—</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-500 rounded-xs focus:outline-none focus:ring-1 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-500 rounded-xs focus:outline-none focus:ring-1 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-500 rounded-xs focus:outline-none focus:ring-1 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm mt-2 mb-6">
            <div className="text-gray-600 hover:underline">
              Forgot your password?
            </div>

            <Link
            to='/login'
            >
              <div className="text-gray-600 hover:underline">
                Login Here
              </div>
            </Link>
            
          </div>

          <button
            type="submit"
            className="w-auto px-10 py-2 bg-black text-white text-sm font-medium rounded-xs hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-auto block"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
