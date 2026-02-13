import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { sendContactMessage } from '../services/api';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'Request Manpower',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendContactMessage(formData);
            alert("Message sent successfully!");
            setFormData({ firstName: '', lastName: '', email: '', subject: 'Request Manpower', message: '' });
        } catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-gray-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-gray-300">Let's discuss your manpower requirements.</p>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="p-8 shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                    <option>Request Manpower</option>
                                    <option>Job Application</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                Our support team is available Monday to Saturday, 8:00 AM to 6:00 PM.
                                Visit our head office for direct consultations.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><MapPin /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Head Office</h4>
                                    <p className="text-gray-600">No. 45/B, Kandy Road, <br />Peliyagoda, Sri Lanka</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Phone /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">+94 11 234 5678</p>
                                    <p className="text-gray-600">+94 77 123 4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Mail /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Email</h4>
                                    <p className="text-gray-600">info@dissanayakacontractors.lk</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 h-48 rounded-xl flex items-center justify-center text-gray-500 border border-gray-300">
                            Map Component Placeholder
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
