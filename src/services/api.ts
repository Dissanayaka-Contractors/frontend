import axios from 'axios';
import { type Job, type Testimonial, type ContactForm } from '../types';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchJobs = async (): Promise<Job[]> => {
    const response = await API.get<Job[]>('/jobs');
    return response.data;
};

export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
    const response = await API.post<Job>('/jobs', job);
    return response.data;
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    const response = await API.get<Testimonial[]>('/testimonials');
    return response.data;
};

export const sendContactMessage = async (data: ContactForm): Promise<{ message: string, id: number }> => {
    const response = await API.post<{ message: string, id: number }>('/contact', data);
    return response.data;
};

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await API.post('/auth/register', { username, email, password });
    return response.data;
};

export const loginUser = async (email: string, password: string) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
};

export const submitApplication = async (formData: FormData) => {
    const response = await API.post('/applications', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const fetchApplications = async () => {
    const response = await API.get('/applications');
    return response.data;
};

export const fetchUserApplications = async () => {
    const response = await API.get('/applications/my');
    return response.data;
};

export const fetchJobById = async (id: number): Promise<Job> => {
    const response = await API.get<Job>(`/jobs/${id}`);
    return response.data;
};
