import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon, EnvelopeIcon, ShieldCheckIcon, KeyIcon } from "@heroicons/react/24/solid";

import bgImage from "../assets/login-animated-bg.png";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP/New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await authService.forgotPassword(email);
            setMessage('OTP sent to your email successfully.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await authService.resetPassword(email, otp, newPassword, confirmPassword);
            alert('Password reset successful! Redirecting to login...');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Invalid OTP or request.');
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

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-[380px] bg-white rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 text-[#0b63d1] hover:underline transition-all flex items-center gap-1 text-[0.85rem] font-bold"
                >
                    <ArrowLeftIcon className="w-3.5 h-3.5" />
                    Back to Login
                </button>

                <div className="text-center mt-8 mb-8">
                    <h2 className="text-[#0b63d1] text-2xl font-bold">
                        {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                    </h2>
                    <p className="text-[#0b63d1] font-bold text-[0.8rem] mt-2 tracking-tight">
                        {step === 1
                            ? "Enter your email to receive an OTP."
                            : "Enter the OTP and your new password."}
                    </p>
                </div>

                {error && (
                    <div className="w-full mb-6 p-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded text-center">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="w-full mb-6 p-2 bg-green-50 border border-green-200 text-green-600 text-xs font-semibold rounded text-center">
                        {message}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="w-full flex flex-col items-center gap-5">
                        <div className="w-full bg-[#ebf2ff] rounded-sm transition-all focus-within:ring-1 focus-within:ring-[#0b63d1]/30">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address..."
                                className="w-full py-2.5 bg-transparent text-gray-800 text-sm font-medium focus:outline-none placeholder:text-gray-400 text-center"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full py-2.5 bg-[#0b63d1] hover:bg-[#084da8] text-white font-bold text-sm uppercase tracking-wide rounded-md shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="w-full flex flex-col items-center gap-4">
                        <div className="w-full bg-[#ebf2ff] rounded-sm">
                            <input
                                type="text"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                className="w-full py-2.5 bg-transparent text-gray-800 text-sm font-medium focus:outline-none placeholder:text-gray-400 text-center"
                            />
                        </div>

                        <div className="w-full relative bg-[#ebf2ff] rounded-sm flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full py-2.5 bg-transparent text-gray-800 text-sm font-medium focus:outline-none placeholder:text-gray-400 text-center"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-gray-400 hover:text-[#0b63d1]"
                            >
                                {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            </button>
                        </div>

                        <div className="w-full relative bg-[#ebf2ff] rounded-sm flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full py-2.5 bg-transparent text-gray-800 text-sm font-medium focus:outline-none placeholder:text-gray-400 text-center"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full py-2.5 bg-[#0b63d1] hover:bg-[#084da8] text-white font-bold text-sm uppercase tracking-wide rounded-md shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
