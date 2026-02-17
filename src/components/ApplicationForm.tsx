import React, { useState } from 'react';
import { Button } from './ui/Button';
import { submitApplication } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ApplicationFormProps {
    jobId: number;
    onSuccess?: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobId, onSuccess }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [fullName, setFullName] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('Male');
    const [age, setAge] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!cvFile) {
            setError('Please upload your CV (PDF or Word document).');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('job_id', jobId.toString());
            formData.append('full_name', fullName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('gender', gender);
            formData.append('age', age);
            formData.append('cv', cvFile);

            await submitApplication(formData);
            Swal.fire('Submitted!', 'Application submitted successfully!', 'success');
            if (onSuccess) onSuccess();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to submit application.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="mb-4">You must be logged in to apply.</p>
                <Button onClick={() => navigate('/login')}>Login to Apply</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Apply for this Position</h3>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={phone} onChange={e => setPhone(e.target.value)} placeholder="077-1234567" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" required min="18" max="100" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 25" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none h-24"
                    value={address} onChange={e => setAddress(e.target.value)}></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF/Word)</label>
                <input type="file" required accept=".pdf,.doc,.docx" className="w-full p-2 border rounded"
                    onChange={e => setCvFile(e.target.files ? e.target.files[0] : null)} />
            </div>

            <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" required id="confirmation" className="mt-1" />
                <label htmlFor="confirmation" className="text-sm text-gray-600">
                    I confirm that the information given above is true and complete. I understand that any false information may disqualify me from employment.
                </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
        </form>
    );
};
