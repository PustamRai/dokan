import React from "react";
import { useAuthContext } from "../../context/authContext";

function Dashboard() {
  const { user } = useAuthContext();

  if (user === null) {
    return <p>Loading...</p>; // or a spinner
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <h2 className="flex items-center font-mono">
        Hello 
        <p className="font-bold text-lg text-blue-500">{user?.name}</p>,
        Welcome to Admin Panel{" "}
      </h2>
    </div>
  );
}

export default Dashboard;
