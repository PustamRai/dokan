import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";


function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { adminLogin, user } = useAuthContext()

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminLogin({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="max-w-md w-full px-6 py-8 rounded-lg ">
        <h2 className="text-2xl font-normal text-center text-gray-800 mb-6 font-serif">
          Admin login<span className="mx-2">—</span>
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
            <div className="text-gray-600 hover:underline cursor-pointer">
              Forgot your password?
            </div>
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

export default AdminLogin;
