import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaCheckCircle, FaCoins, FaShoppingCart, FaUserFriends } from "react-icons/fa";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";

const ProfilePage = () => {
    const { user} = useContext(AuthContext);
    const coinHistory = [
        { day: "Mon", coins: 80 },
        { day: "Tue", coins: 85 },
        { day: "Wed", coins: 90 },
        { day: "Thu", coins: 95 },
        { day: "Fri", coins: 100 },
        { day: "Sat", coins: 104 },
        { day: "Sun", coins: 104 },
      ];
    return (
        <div className="flex min-h-screen bg-gray-100 p-6">
          {/* Sidebar */}
          <aside className="w-1/4 bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col items-center">
              <img src={user.photoURL} alt={user.displayName} className="w-24 h-24 rounded-full mb-3 border-4 border-[#5f1a89]" />
              <h2 className="text-lg font-semibold">{user.displayName}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className="mt-5 border-t pt-4">
              <p className="text-gray-600 mb-2">Registered: {user.registered}</p>
              <p className="text-gray-600 mb-2">Phone: {user.phone}</p>
              <p className="text-gray-600">Address: {user.address}</p>
            </div>
            <nav className="mt-6 space-y-3">
              <a href="#" className="flex items-center  font-semibold">
                <FaCoins className="mr-2" />Coins: {user.coins}
              </a>
              <a href="#" className="flex items-center text-gray-600">
                <FaCheckCircle className="mr-2" />Role: {user.role}
              </a>
              <a href="#" className="flex items-center text-gray-600">
                <FaShoppingCart className="mr-2" />Registrations Date: {user.timestamp}
              </a>
              
            </nav>
          </aside>
    
          {/* Main Profile Section */}
          <main className="flex-1 ml-6 bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Profile</h1>
              <button className="bg-[#5f1a89] text-white px-4 py-2 rounded-lg">Edit Profile</button>
            </div>
    
            <div className="bg-purple-100 p-4 rounded-lg flex items-center">
              <span className="text-4xl font-bold text-[#5f1a89]">{user.coins}</span>
              <span className="ml-3 text-[#5f1a89]">Coins Earned</span>
            </div>
    
            {/* Coin History Chart Section */}
        <div className="mt-6 bg-gray-200 p-6 rounded-lg h-64">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Coin History</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={coinHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#5f1a89" />              
              <YAxis stroke="#5f1a89" />              
              <Tooltip />              
              <Line type="monotone" dataKey="coins" stroke="#5f1a89" strokeWidth={2} dot={{ r: 4 }} />              
            </LineChart>
          </ResponsiveContainer>
        </div>
          </main>
        </div>
      );
    };
    

export default ProfilePage;