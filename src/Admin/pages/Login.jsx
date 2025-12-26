import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/adminlogin", {
        username,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
      setError("Wrong username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200">
      <form
        onSubmit={submit}
        className="w-[360px] bg-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center mb-3">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="text-sm text-gray-600">Username</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
