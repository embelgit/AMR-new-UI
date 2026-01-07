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
import bg from "../assets/amr.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const role = "SUPER_ADMIN";
    localStorage.setItem("role", role);
    navigate("/dashboard");
  };

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-45"></div>

      {/* Login Card */}
      <div className="relative w-80 rounded-lg bg-gradient-to-b from-blue-900 to-blue-700 shadow-2xl text-white text-center p-6 flex flex-col">
        <h2 className="mb-6 font-semibold text-2xl">
          Sign in to continue
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Username (email)"
          className="mb-4 p-3 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-blue-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <button
          type="button"
          className="mb-4 text-xs text-blue-300 hover:underline bg-transparent border-none"
          onClick={() => alert("Forgot Password feature coming soon")}
        >
          Forgot Password?
        </button>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mt-2 py-2.5 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
