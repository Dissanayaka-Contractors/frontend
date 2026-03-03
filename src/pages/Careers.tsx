import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, Briefcase, Trash2, ClipboardCopy, Loader2, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { type Job } from '../types';
import { fetchJobs, createJob, deleteJob } from '../services/api';
import { SEOHead } from '../components/SEOHead';
import html2canvas from 'html2canvas';

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
    const captureRef = useRef<HTMLDivElement>(null);
    const [isPosting, setIsPosting] = useState(false);
    const [downloadingJobId, setDownloadingJobId] = useState<number | null>(null);

    const handleDownloadJobImage = async (job: Job) => {
        const el = document.getElementById(`poster-${job.id}`);
        if (!el) return;
        try {
            setDownloadingJobId(job.id);
            const canvas = await html2canvas(el, {
                scale: 2,
                backgroundColor: "#ffffff",
                useCORS: true,
                logging: false
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `Job_Post_${job.title}.png`;
            link.click();
        } catch (err) {
            console.error("Failed to download image", err);
            Swal.fire('Error', 'Failed to generate image for download.', 'error');
        } finally {
            setDownloadingJobId(null);
        }
    };

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            let fbImageBase64 = '';
            if (captureRef.current) {
                const canvas = await html2canvas(captureRef.current, {
                    scale: 2,
                    backgroundColor: "#ffffff",
                    useCORS: true,
                    logging: false
                });
                fbImageBase64 = canvas.toDataURL("image/jpeg", 0.95);
            }

            const jobData = {
                title: newJob.title,
                location: newJob.location,
                type: newJob.type,
                description: newJob.description,
                salary: newJob.salary,
                postedDate: new Date().toISOString().split('T')[0],
                keywords: newJob.keywords.split(',').map(k => k.trim()),
                fbImageBase64
            };
            await createJob(jobData);
            setNewJob({ title: '', location: '', type: 'Full-time', salary: '', description: '', keywords: '' });
            Swal.fire('Job Posted!', 'Job Posted Successfully!', 'success');
            loadJobs(); // Refresh list
        } catch (error) {
            console.error("Failed to post job:", error);
            Swal.fire('Error', 'Failed to post job.', 'error');
        } finally {
            setIsPosting(false);
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

    const handleShare = (job: Job) => {
        const url = `https://www.dissanayakacontractors.com/careers/${job.id}`;
        const copyText = `New Job Posted: ${job.title}!\nLocation: ${job.location}\nType: ${job.type}\nSalary: ${job.salary}\n${job.description}\nVisit our site to apply.\n${url}`;
        navigator.clipboard.writeText(copyText).then(() => {
            Swal.fire({
                title: 'Copied!',
                text: 'Job details copied to clipboard.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            Swal.fire('Error', 'Failed to copy job details.', 'error');
        });
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
            <SEOHead
                title="Careers - Jobs at Dissanayaka Contractors"
                description="Find job opportunities in construction and industrial sectors in Sri Lanka. Apply now for skilled and unskilled positions."
                keywords="jobs in sri lanka, construction jobs, driver vacancies, electrician jobs"
            />
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
                    <Card className="mb-12 border-blue-200 ring-4 ring-blue-50 relative overflow-hidden">
                        {/* Hidden Poster Element for html2canvas */}
                        <div style={{ position: 'absolute', top: 0, left: '-9999px', zIndex: -100 }}>
                            <div
                                ref={captureRef}
                                style={{
                                    width: '900px',
                                    background: '#fff',
                                    border: '8px solid #1c4f8a',
                                    fontFamily: 'Arial, sans-serif'
                                }}
                            >
                                <div style={{ padding: '28px 34px 22px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <img src="/logo-sm.png" alt="Company Logo" style={{ width: '800px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ margin: '28px 0 20px', fontSize: '78px', fontWeight: 900, color: '#1c4f8a', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.1, padding: '10px' }}>
                                            {newJob.title || 'Job Title'}
                                        </div>
                                        <div style={{ color: '#1c4f8a', fontWeight: 1000, fontSize: '30px', textAlign: 'center' }}>
                                            <p style={{ margin: '10px 0' }}>{newJob.location || 'Location'}</p>
                                            <p style={{ margin: '10px 0' }}>{newJob.type || 'Employment Type'}</p>
                                            <p style={{ margin: '10px 0' }}>{newJob.salary || 'Salary Indication'}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '26px', paddingTop: '14px', borderTop: '2px solid rgba(28, 79, 138, 0.25)', fontSize: '22px', color: '#1c4f8a', fontWeight: 700, textAlign: 'center' }}>
                                        Visit our website: <span>www.dissanayakacontractors.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={isPosting}>
                                    {isPosting ? <><Loader2 className="animate-spin" size={20} /> Publishing...</> : 'Publish Job'}
                                </Button>
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
                            <Card key={job.id} className="p-6 hover:border-blue-300 transition-colors relative overflow-hidden">
                                {/* Hidden Poster Element for this Job */}
                                <div style={{ position: 'absolute', top: 0, left: '-9999px', zIndex: -100 }}>
                                    <div
                                        id={`poster-${job.id}`}
                                        style={{
                                            width: '900px',
                                            background: '#fff',
                                            border: '8px solid #1c4f8a',
                                            fontFamily: 'Arial, sans-serif'
                                        }}
                                    >
                                        <div style={{ padding: '28px 34px 22px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <img src="/logo-sm.png" alt="Company Logo" style={{ width: '800px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ margin: '28px 0 20px', fontSize: '78px', fontWeight: 900, color: '#1c4f8a', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.1, padding: '10px' }}>
                                                    {job.title || 'Job Title'}
                                                </div>
                                                <div style={{ color: '#1c4f8a', fontWeight: 1000, fontSize: '30px', textAlign: 'center' }}>
                                                    <p style={{ margin: '10px 0' }}>{job.location || 'Location'}</p>
                                                    <p style={{ margin: '10px 0' }}>{job.type || 'Employment Type'}</p>
                                                    <p style={{ margin: '10px 0' }}>{job.salary || 'Salary Indication'}</p>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '26px', paddingTop: '14px', borderTop: '2px solid rgba(28, 79, 138, 0.25)', fontSize: '22px', color: '#1c4f8a', fontWeight: 700, textAlign: 'center' }}>
                                                Visit our website: <span>www.dissanayakacontractors.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        <div className="flex gap-2 items-center">
                                            {/* Share Button - Visible to Everyone */}
                                            <Button
                                                variant="secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShare(job);
                                                }}
                                                className="flex items-center gap-2 px-2"
                                            >
                                                <ClipboardCopy size={16} />
                                                Copy
                                            </Button>

                                            {/* Role-based Actions */}
                                            {user?.role === 'admin' && (
                                                <>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDownloadJobImage(job);
                                                        }}
                                                        className="flex items-center gap-2 px-2"
                                                        disabled={downloadingJobId === job.id}
                                                    >
                                                        {downloadingJobId === job.id ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                                                        Download
                                                    </Button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteJob(job.id!)
                                                        }}
                                                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-sm font-medium px-3 py-[10px] rounded-lg border-2 border-red-400 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} />
                                                        Delete
                                                    </button>
                                                </>
                                            )}

                                            {user?.role === 'user' && (
                                                <Button variant="secondary" onClick={() => navigate(`/careers/${job.id}`)}>Apply Now</Button>
                                            )}

                                            {!user && (
                                                <Button variant="secondary" onClick={() => navigate(`/careers/${job.id}`)}>View Details</Button>
                                            )}
                                        </div>
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
