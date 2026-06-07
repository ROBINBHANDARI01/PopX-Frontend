import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-end p-6 pb-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PopX</h1>
      <p className="text-gray-500 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      
      <button
        onClick={() => navigate("/register")}
        className="w-full bg-purple-600 text-white py-3 rounded-md font-medium mb-3"
      >
        Create Account
      </button>
      
      <button
        onClick={() => navigate("/login")}
        className="w-full bg-purple-100 text-gray-800 py-3 rounded-md font-medium"
      >
        Already Registered? Login
      </button>
    </div>
  );
}