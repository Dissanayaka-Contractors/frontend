import React from 'react';
import { CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-600 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">About Dissanayaka Contractors</h1>
                <p className="text-xl text-blue-100">Empowering Sri Lankan industries with quality manpower.</p>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2014 by Mr. Dissanayaka, our company started as a small sub-contracting unit in Awissawella. Recognizing the gap in reliable, organized labor supply, we pivoted to become a full-service manpower agency.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Today, we serve over 50 major construction and industrial firms across the island, ensuring that projects are never delayed due to labor shortages.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><CheckCircle size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Our Mission</h4>
                                    <p className="text-sm text-gray-600">To provide dignity of labor to workers and reliability to employers.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><CheckCircle size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Our Vision</h4>
                                    <p className="text-sm text-gray-600">To be Sri Lanka's #1 workforce solutions provider by 2030.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Construction Team"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                            <p className="text-blue-600 font-bold text-lg mb-1">"Quality is our habit."</p>
                            <p className="text-gray-500 text-sm">- Founder</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
