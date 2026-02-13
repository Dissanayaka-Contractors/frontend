import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser, verifyUser } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Swal from 'sweetalert2';

export const Register: React.FC = () => {
    const [step, setStep] = useState<'register' | 'verify'>('register');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await registerUser(username, email, password);
            setStep('verify');
            Swal.fire('Verification Code Sent', 'A verification code has been sent to your email.', 'info');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const data = await verifyUser(email, otp);
            login(data.token, data);

            await Swal.fire('Verified!', 'Email verified successfully! You can now log in.', 'success');
            navigate('/login');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
            <Card className="w-full max-w-md p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
                    {step === 'register' ? 'Create Account' : 'Verify Email'}
                </h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                {step === 'register' ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full py-3 text-lg">Sign Up</Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="text-center mb-4 text-gray-600">
                            Please enter the verification code sent to <strong>{email}</strong>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center text-2xl tracking-widest"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                            />
                        </div>
                        <Button type="submit" className="w-full py-3 text-lg">Verify Email</Button>
                        <button
                            type="button"
                            onClick={() => setStep('register')}
                            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
                        >
                            Back to Registration
                        </button>
                    </form>
                )}

                {step === 'register' && (
                    <p className="mt-6 text-center text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
                    </p>
                )}
            </Card>
        </div>
    );
};
