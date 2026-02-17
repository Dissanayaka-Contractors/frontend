import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Briefcase, DollarSign, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Swal from 'sweetalert2';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { fetchJobById } from '../services/api';
import { ApplicationForm } from '../components/ApplicationForm';
import { type Job } from '../types';
import { SEOHead } from '../components/SEOHead';

export const JobDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJob = async () => {
            if (!id) return;
            try {
                const data = await fetchJobById(Number(id));
                setJob(data);
            } catch (error) {
                console.error("Failed to load job", error);
            } finally {
                setLoading(false);
            }
        };
        loadJob();
    }, [id]);

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            Swal.fire({
                title: 'Link Copied!',
                text: 'Job link copied to clipboard.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            Swal.fire('Error', 'Failed to copy link.', 'error');
        });
    };

    if (loading) return <div className="text-center py-20">Loading job details...</div>;
    if (!job) return <div className="text-center py-20">Job not found.</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <SEOHead
                title={`${job.title} - Dissanayaka Contractors`}
                description={`Apply for ${job.title} at Dissanayaka Contractors. Location: ${job.location}. Type: ${job.type}. ${job.description.substring(0, 100)}...`}
                keywords={`job vacancy, ${job.title}, ${job.location}, ${job.type}, sri lanka jobs`}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" size="sm" onClick={() => navigate('/careers')}>
                        <ArrowLeft size={16} /> Back to Careers
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
                        <Share2 size={16} /> Share
                    </Button>
                </div>

                <Card className="p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <div className="flex flex-wrap gap-4 text-gray-600">
                                <span className="flex items-center gap-1"><MapPin size={18} /> {job.location}</span>
                                <span className="flex items-center gap-1"><Briefcase size={18} /> {job.type}</span>
                                <span className="flex items-center gap-1"><DollarSign size={18} /> {job.salary}</span>
                                <span className="flex items-center gap-1"><Clock size={18} /> Posted: {job.postedDate}</span>
                            </div>
                        </div>
                        <Badge>{job.type}</Badge>
                    </div>

                    <div className="prose max-w-none text-gray-700 mb-8">
                        <h3 className="text-xl font-semibold mb-2">Job Description</h3>
                        <p className="whitespace-pre-line">{job.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {job.keywords.map((keyword, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {keyword}
                            </span>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <ApplicationForm jobId={job.id!} />
                    </div>
                </Card>
            </div>
        </div>
    );
};
