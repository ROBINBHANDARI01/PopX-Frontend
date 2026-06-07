import { useNavigate } from "react-router-dom";
import { getUser, removeToken } from "../Auth/auth";

export default function Dashboard() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
        <button onClick={handleLogout} className="text-sm text-purple-600">Logout</button>
      </div>

      <div className="bg-white rounded-xl p-4 flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/60"
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            📷
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{user?.name || "Marry Doe"}</p>
          <p className="text-sm text-gray-500">{user?.email || "Marry@Gmail.Com"}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor
          Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </div>
    </div>
  );
}