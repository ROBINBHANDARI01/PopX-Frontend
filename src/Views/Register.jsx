import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToken } from "../Auth/auth";

const fields = [
  { name: "fullName", label: "Full Name*", type: "text" },
  { name: "phone", label: "Phone number*", type: "tel" },
  { name: "email", label: "Email address*", type: "email" },
  { name: "password", label: "Password*", type: "password" },
  { name: "company", label: "Company name", type: "text" },
];

export default function Register() {
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    password: "", company: "", isAgency: "yes"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, form);
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-10">
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create your<br />PopX account</h1>
      <button
        onClick={() => navigate("/")}
        className=" text-gray-500 flex flex-nowrap py-5 rounded-md"
      >
       Home →
      </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {fields.map(f => (
        <div key={f.name} className="mb-4 relative border border-gray-300 rounded-md bg-white px-3 pt-4 pb-2">
          <label className="absolute -top-2.5 left-3 text-xs text-purple-600 bg-white px-1">{f.label}</label>
          <input
            type={f.type}
            placeholder="Enter value"
            className="w-full outline-none text-sm bg-transparent"
            value={form[f.name]}
            onChange={e => setForm({ ...form, [f.name]: e.target.value })}
          />
        </div>
      ))}

      <p className="text-sm font-medium text-gray-700 mb-2">Are you an Agency?*</p>
      <div className="flex gap-6 mb-10">
        {["yes", "no"].map(v => (
          <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="agency"
              value={v}
              checked={form.isAgency === v}
              onChange={() => setForm({ ...form, isAgency: v })}
              className="accent-purple-600"
            />
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white py-3 rounded-md font-medium"
      >
        Create Account
      </button>
      
    </div>
  );
}