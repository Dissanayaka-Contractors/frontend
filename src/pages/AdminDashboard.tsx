import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { fetchApplications } from '../services/api';

interface Application {
    id: number;
    job_id: number;
    user_id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    cv_path: string;
    status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
    applied_at: string;
    job_title: string;
}

export const AdminDashboard: React.FC = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            navigate('/login');
            return;
        }

        if (user?.role === 'admin') {
            loadApplications();
        }
    }, [user, isLoading, navigate]);

    const loadApplications = async () => {
        try {
            const data = await fetchApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to load applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'reviewed': return 'bg-blue-100 text-blue-800';
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading || loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Applications Section */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <FileText className="text-blue-600" />
                        Recent Applications
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-600 text-sm">
                                    <th className="py-3 px-4">Applicant</th>
                                    <th className="py-3 px-4">Job Title</th>
                                    <th className="py-3 px-4">Contact</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">CV</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-500">
                                            No applications received yet.
                                        </td>
                                    </tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900">{app.full_name}</div>
                                                <div className="text-xs text-gray-500">{app.gender}</div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">{app.job_title}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                <div>{app.email}</div>
                                                <div>{app.phone}</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-500">
                                                {new Date(app.applied_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <a
                                                    href={`${import.meta.env.VITE_API_URL}/uploads/${app.cv_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline text-sm font-medium"
                                                >
                                                    View CV
                                                </a>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <button className="text-gray-400 hover:text-green-600" title="Approve">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-600" title="Reject">
                                                        <XCircle size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
