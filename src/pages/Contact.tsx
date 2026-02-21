import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Swal from 'sweetalert2';
import { sendContactMessage } from '../services/api';
import { SEOHead } from '../components/SEOHead';

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
            Swal.fire('Message Sent!', 'Your message has been sent successfully.', 'success');
            setFormData({ firstName: '', lastName: '', email: '', subject: 'Request Manpower', message: '' });
        } catch (error) {
            console.error("Failed to send message:", error);
            Swal.fire('Error', 'Failed to send message. Please try again.', 'error');
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <SEOHead
                title="Contact Us - Dissanayaka Contractors"
                description="Contact Dissanayaka Contractors for manpower supply, job applications, or general inquiries. Located in Peliyagoda, Sri Lanka."
                keywords="contact manpower agency, dissanayaka contractors address, labor supply inquiry"
            />
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
                                    <p className="text-gray-600">No.6 SANASA 30 Complex, Giriulla Road, <br />Badalgama, Sri Lanka</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Phone /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">+94 77 881 2425</p>
                                    <p className="text-gray-600">+94 71 893 8086</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Mail /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Email</h4>
                                    <p className="text-gray-600"> dissanayakacontractors.info@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-48 rounded-xl flex items-center justify-center text-gray-500 border border-gray-300 overflow-hidden">
                            <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4982998530295!2d79.88834027608031!3d7.297775373912596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e8417cac41d9%3A0xb73b6190257ac87e!2sNegombo-Kurunegala%20Rd!5e0!3m2!1sen!2slk!4v1771595763864!5m2!1sen!2slk" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
