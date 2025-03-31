import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useProductContext } from "../context/productContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const { API, toast, token, setToken } = useProductContext()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/api/user/login', { email, password })
      const { token } = response?.data?.data

      if(response.data.success) {
        setToken(token)
        localStorage.setItem('token', token)
      }

      toast.success(response?.data?.message)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log("error in logIn: ", error)
      toast.error(error.response?.data?.message || "User login failed")
      setEmail('')
      setPassword('')
    }
  };

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="max-w-md w-full px-6 py-8 rounded-lg ">
        <h2 className="text-2xl font-normal text-center text-gray-800 mb-6 font-serif">
          Login<span className="mx-2">—</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
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
            to='/signup'
            >
              <div className="text-gray-600 hover:underline flex items-center">
                Create account
              </div>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto md:px-12 py-2 bg-black text-white text-sm font-medium rounded-xs hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-auto block cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
