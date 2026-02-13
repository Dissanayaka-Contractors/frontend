import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Briefcase, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { type Job } from '../types';
import { fetchJobs, createJob, deleteJob } from '../services/api';

import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Careers: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await fetchJobs();
            setJobs(data);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        }
    };

    // --- Job Page State ---
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    // --- Admin Post Job State ---
    const [newJob, setNewJob] = useState({
        title: '', location: '', type: 'Full-time', salary: '', description: '', keywords: ''
    });

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const jobData = {
                title: newJob.title,
                location: newJob.location,
                type: newJob.type,
                description: newJob.description,
                salary: newJob.salary,
                postedDate: new Date().toISOString().split('T')[0],
                keywords: newJob.keywords.split(',').map(k => k.trim())
            };
            await createJob(jobData);
            setNewJob({ title: '', location: '', type: 'Full-time', salary: '', description: '', keywords: '' });
            Swal.fire('Job Posted!', 'Job Posted Successfully!', 'success');
            loadJobs(); // Refresh list
        } catch (error) {
            console.error("Failed to post job:", error);
            Swal.fire('Error', 'Failed to post job.', 'error');
        }
    };

    const handleDeleteJob = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                if (id) {
                    await deleteJob(id);
                    setJobs(jobs.filter(job => job.id !== id));
                    Swal.fire('Deleted!', 'Job deleted successfully.', 'success');
                }
            } catch (error) {
                console.error("Failed to delete job:", error);
                Swal.fire('Error', 'Failed to delete job', 'error');
            }
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesLocation = locationFilter ? job.location === locationFilter : true;
        const matchesType = typeFilter ? job.type === typeFilter : true;
        return matchesSearch && matchesLocation && matchesType;
    });

    const uniqueLocations = Array.from(new Set(jobs.map(j => j.location)));
    const uniqueTypes = Array.from(new Set(jobs.map(j => j.type)));

    return (
        <div className="animate-in fade-in duration-500 bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Careers at Dissanayaka</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our growing team. We connect skilled individuals with the best opportunities in the market.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* ADMIN PANEL */}
                {user?.role === 'admin' && (
                    <Card className="mb-12 border-blue-200 ring-4 ring-blue-50">
                        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
                            <h2 className="font-bold flex items-center gap-2"><Briefcase size={20} /> Admin: Post a New Job</h2>
                            <span className="text-xs bg-blue-500 px-2 py-1 rounded">Admin Access</span>
                        </div>
                        <form onSubmit={handlePostJob} className="p-6 grid md:grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior Electrician" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Colombo 03" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Temporary</option>
                                    <option>Daily Wage</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Indication</label>
                                <input required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. LKR 45,000/mo" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
                                <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Construction, Site, Manual" value={newJob.keywords} onChange={e => setNewJob({ ...newJob, keywords: e.target.value })} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea required rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Job details..." value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} />
                            </div>
                            <div className="col-span-2">
                                <Button type="submit" className="w-full">Publish Job</Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* USER VIEW: Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search jobs by title or keyword..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select
                            className="w-full h-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        >
                            <option value="">All Locations</option>
                            {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                    <div className="w-full md:w-48">
                        <select
                            className="w-full h-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="grid gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <Card key={job.id} className="p-6 hover:border-blue-300 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                                            <span className="flex items-center gap-1 text-green-600 font-medium">{job.salary}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 md:items-end">
                                        {user?.role === 'admin' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteJob(job.id!)
                                                }}
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-sm font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        )}
                                        {user?.role === 'user' && (
                                            <Button variant="secondary" onClick={() => navigate(`/careers/${job.id}`)}>Apply Now</Button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-3">{job.description.substring(0, 150)}...</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.keywords.map((k, i) => (
                                        <Badge key={i} color="gray">{k}</Badge>
                                    ))}
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
