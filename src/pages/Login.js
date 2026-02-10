import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

import logo from "../assets/emble-logo-new.png";
import bgImage from "../assets/login-animated-bg.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#a3c8f8] overflow-hidden">
      {/* Interactive Background Layer */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
          filter: 'brightness(0.9) contrast(1.1)'
        }}
      ></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[380px] bg-white rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.1)] p-10 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-6 flex items-center justify-center">
          <img
            src={logo}
            alt="Emble Logo"
            className="w-[90px] h-auto object-contain"
          />
        </div>

        <h1 className="text-[#0b63d1] text-3xl font-bold mt-0">Login</h1>
        <p className="text-[#0b63d1] font-bold text-[0.95rem] mt-2 mb-10 tracking-tight text-center">Log in with your account</p>

        {error && (
          <div className="w-full mb-6 p-2 bg-red-50 border border-red-200 text-red-600 text-[0.95rem] font-semibold rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-5">
          <div className="w-full bg-[#ebf2ff] rounded-sm transition-all focus-within:ring-1 focus-within:ring-[#0b63d1]/30">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full py-2.5 bg-transparent text-gray-800 text-sm font-medium focus:outline-none placeholder:text-gray-400 text-center"
            />
          </div>

          <div className="w-full relative bg-[#ebf2ff] rounded-sm transition-all focus-within:ring-1 focus-within:ring-[#0b63d1]/30 flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full py-2.5 bg-transparent text-gray-800 text-sm font-medium focus:outline-none placeholder:text-gray-400 text-center"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-[#0b63d1] transition-colors"
              tabIndex="-1"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-2.5 bg-[#0b63d1] hover:bg-[#084da8] text-white font-bold text-sm uppercase tracking-wide rounded-md shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center">
          <button
            type="button"
            className="text-[#0b63d1] text-[0.95rem] font-bold hover:underline tracking-tight transition-all"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
