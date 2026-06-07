import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToken } from "../Auth/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, form);
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between">
        <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Signin to your<br />PopX account</h1>
      <p className="text-gray-500 mb-8">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    
      </div>
      <button
        onClick={() => navigate("/")}
        className=" text-gray-500 flex flex-nowrap py-5 rounded-md"
      >
       Home →
      </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4 relative border border-gray-300 rounded-md bg-white px-3 pt-4 pb-2">
        <label className="absolute -top-2.5 left-3 text-xs text-purple-600 bg-white px-1">Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full outline-none text-sm bg-transparent"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="mb-6 relative border border-gray-300 rounded-md bg-white px-3 pt-4 pb-2">
        <label className="absolute -top-2.5 left-3 text-xs text-purple-600 bg-white px-1">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full outline-none text-sm bg-transparent"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white py-3 rounded-md font-medium"
      >
        Login
      </button>


    </div>
  );
}