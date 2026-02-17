// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Briefcase, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SEOHead } from '../components/SEOHead';
// import { fetchTestimonials } from '../services/api';
// import { type Testimonial } from '../types';

export const Home: React.FC = () => {
    // const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    // useEffect(() => {
    //     const loadTestimonials = async () => {
    //         try {
    //             const data = await fetchTestimonials();
    //             setTestimonials(data);
    //         } catch (error) {
    //             console.error("Failed to fetch testimonials:", error);
    //         }
    //     };
    //     loadTestimonials();
    // }, []);

    return (
        <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <SEOHead
                title="Manpower Agency Sri Lanka - Dissanayaka Contractors"
                description="Reliable manpower supply agency in Sri Lanka. providing skilled and unskilled labor for construction, industrial, and logistics sectors."
                keywords="manpower agency, labor supply, construction workers, sri lanka, industrial staffing"
            />
            <section className="relative bg-blue-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Construction workers on site in Sri Lanka"
                        className="w-full h-full object-cover opacity-10"
                    />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <Badge color="blue" className="bg-blue-800 text-blue-100 mb-4 inline-block">Trusted Since 2010</Badge>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        Building the Nation with <br /><span className="text-blue-400">Reliable Manpower</span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                        We supply skilled and unskilled labor for construction, industrial, and logistics sectors across Sri Lanka.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact">
                            <Button>Request Manpower</Button>
                        </Link>
                        <Link to="/careers">
                            <Button variant="outline" className="text-white border-white hover:bg-white/10">Find Jobs</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 grid grid-cols-3 md:grid-cols-3 gap-8 text-center">
                    {[
                        { label: "Workers Deployed", value: "1,200+" },
                        { label: "Happy Clients", value: "50+" },
                        { label: "Years Experience", value: "14" }
                    ].map((stat, idx) => (
                        <div key={idx}>
                            <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Services</h2>
                        <p className="text-gray-600">We specialize in providing workforce solutions tailored to your project needs.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Hammer className="w-8 h-8 text-blue-600" />, title: "Construction Labor", desc: "Masons, carpenters, bar benders, and general helpers for sites." },
                            { icon: <Briefcase className="w-8 h-8 text-blue-600" />, title: "Industrial Staffing", desc: "Factory workers, packing staff, and warehouse loaders." },
                            { icon: <Users className="w-8 h-8 text-blue-600" />, title: "Skilled Technicians", desc: "Electricians, plumbers, welders, and equipment operators." }
                        ].map((service, idx) => (
                            <Card key={idx} className="p-8 hover:-translate-y-1 transition-transform">
                                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {/* <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((t) => (
                            <Card key={t.id} className="p-8 bg-blue-50 border-none">
                                <p className="text-lg italic text-gray-700 mb-6">"{t.text}"</p>
                                <div>
                                    <div className="font-bold text-gray-900">{t.name}</div>
                                    <div className="text-sm text-blue-600">{t.role}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    );
};
