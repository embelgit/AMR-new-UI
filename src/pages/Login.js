// import React from "react";
// import amrBg from "../assets/amr.png";

// const Login = () => {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${amrBg})` }}
//     >
//       <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md p-8">

//         {/* Title */}
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           sign in to continue
//         </h2>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Forgot password */}
//         <div className="flex justify-end mb-6">
//           <button
//             type="button"
//             className="text-sm text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
//             onClick={() => console.log("Forgot Password clicked")}
//           >
//             Forgot Password?
//           </button>
//         </div>

//         {/* Login Button */}
//         <button
//           type="button"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React from "react";
// import "./login.css";
// import bg from "../assets/amr.png";

// const Login = () => {
//   return (
//     <div
//       className="login-wrapper"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       <div className="overlay"></div>

//       <div className="login-card">
//         <h2>Sign in to continue</h2>

//         <div className="input-group">
//           <input type="email" placeholder="Username (email)" />
//         </div>

//         <div className="input-group">
//           <input type="password" placeholder="Password" />
//         </div>

//         <a href="/forgot-password" className="forgot">
//           Forgot Password?
//         </a>

//         <button className="login-btn">Login</button>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React from "react";
// import bg from "../assets/amr.png";

// const Login = () => {
//   return (
//     <div
//       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-45"></div>

//       {/* Login Card */}
//       <div className="relative w-80 h-80 rounded-lg bg-gradient-to-b from-blue-900 to-blue-700 shadow-2xl text-white text-center p-6 flex flex-col justify-center">
//         <h2 className="mb-4 font-semibold text-2xl">Sign in to continue</h2>

//         <input
//           type="email"
//           placeholder="Username (email)"
//           className="mb-3 p-3 rounded-md text-gray-900 text-sm focus:outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="mb-4 p-3 rounded-md text-gray-900 text-sm focus:outline-none"
//         />

//         <a
//           href="/forgot-password"
//           className="mb-4 text-xs text-blue-300 hover:underline"
//         >
//           Forgot Password?
//         </a>

//         <button className="mt-auto py-3 rounded-full bg-green-500 text-white font-semibold text-base hover:bg-green-600 transition">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
// import bg from "../assets/amr.png";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div
//       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-45"></div>

//       {/* Login Card */}
//       <div className="relative w-80 h-80 rounded-lg bg-gradient-to-b from-blue-900 to-blue-700 shadow-2xl text-white text-center p-6 flex flex-col justify-center">
//         <h2 className="mb-5 font-semibold text-2xl">Sign in to continue</h2>

//         <input
//           type="email"
//           placeholder="Username (email)"
//           className="mb-4 p-3 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <div className="relative mb-5">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full p-3 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-600 focus:outline-none"
//             aria-label={showPassword ? "Hide password" : "Show password"}
//           >
//             {showPassword ? (
//               <EyeSlashIcon className="h-5 w-5" />
//             ) : (
//               <EyeIcon className="h-5 w-5" />
//             )}
//           </button>
//         </div>

//         <a
//           href="/forgot-password"
//           className="mb-6 text-xs text-blue-300 hover:underline"
//         >
//           Forgot Password?
//         </a>

//         <button className="mt-auto py-2.5 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(/assets/login_bg.jpg)` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-45"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-sm mx-4 md:mx-0 bg-gradient-to-b from-blue-900 to-blue-700 shadow-2xl text-white text-center p-8 flex flex-col rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="mb-2 font-black text-4xl text-yellow-400 bg-red-600 p-2 animate-bounce">
          !!! SYNC TEST !!!
        </h2>
        <h2 className="mb-8 font-bold text-3xl tracking-tight">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 text-red-100 text-xs rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col">
          {/* Email */}
          <div className="text-left mb-4">
            <label className="block text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1.5 ml-1">Username / Email</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3.5 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-inner transition-all"
            />
          </div>

          {/* Password */}
          <div className="text-left mb-2">
            <label className="block text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-inner transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-8">
            <button
              type="button"
              className="text-xs text-blue-200 hover:text-white transition-colors underline-offset-4 hover:underline bg-transparent border-none font-medium"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="py-4 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] disabled:bg-green-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Sign In Now"}
          </button>
        </form>

        <p className="mt-8 text-xs text-blue-300/60 font-medium">
          AMR Insight Systems v1.2
        </p>
      </div>
    </div>
  );
};

export default Login;
