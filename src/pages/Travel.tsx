import React, { useState } from 'react';
import { Car, MapPin, Map, Camera, Waves, Ship, Mountain, Umbrella, Calendar, ShieldCheck, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/SEOHead';

import t1 from '../assets/images/t1.jpeg';
import t2 from '../assets/images/t2.jpeg';
import t3 from '../assets/images/t3.jpeg';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
);

export const Travel: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="animate-in fade-in duration-500">
            <SEOHead
                title="Disanayaka Taxi & Tour - Explore Sri Lanka"
                description="Your trusted travel partner for discovering the beauty, culture, wildlife and unforgettable experiences of Sri Lanka."
                keywords="taxi, tour, travel, sri lanka, transportation, safari, wildlife, round tours"
            />

            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <img
                        src="https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Nine_Arches_Bridge_in_Ella.jpg/1280px-Nine_Arches_Bridge_in_Ella.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
                        alt="Travel in Sri Lanka - Nine Arches Bridge"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        Explore Sri Lanka <br /><span className="text-blue-400">With Us!</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
                        Your trusted travel partner for discovering the beauty, culture, wildlife, and unforgettable experiences of Sri Lanka.
                        Whether you are looking for a Day Tour, City Tour, Round Tour, or a complete holiday, we are here to arrange everything according to your requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="#contact">
                            <Button>Contact Us Now</Button>
                        </a>
                        <a href="#services">
                            <Button variant="outline" className="text-white border-white hover:bg-white/10">View Our Services</Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-gray-600">Everything you need for the perfect Sri Lankan getaway.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
                        {[
                            { icon: <Car className="w-8 h-8" />, title: "Any Vehicle You Need", desc: "From comfortable cars and vans to luxury buses, safari jeeps, and other vehicles, we can arrange the right vehicle for you, your family, or your group." },
                            { icon: <MapPin className="w-8 h-8" />, title: "Day Tours & City Tours", desc: "Explore Sri Lanka’s beautiful cities, cultural attractions, historical places, temples, waterfalls, mountains, and beaches with comfortable and reliable transportation." },
                            { icon: <Map className="w-8 h-8" />, title: "Sri Lanka Round Tours", desc: "We can arrange complete tours around Sri Lanka, including the country’s most beautiful destinations, with a flexible itinerary based on your interests and available time." },
                            { icon: <Camera className="w-8 h-8" />, title: "Wildlife Safari & Jeep Tours", desc: "Enjoy exciting wildlife experiences and explore Sri Lanka’s amazing national parks with professionally arranged Safari Jeep Tours." },
                            { icon: <Waves className="w-8 h-8" />, title: "Whale & Dolphin Watching", desc: "Enjoy an unforgettable ocean experience with Whale & Dolphin Watching Tours and discover Sri Lanka’s beautiful marine life." },
                            { icon: <Ship className="w-8 h-8" />, title: "Boat Safaris", desc: "Explore beautiful rivers, lagoons, and wetlands with relaxing and exciting Boat Safari Tours." },
                            { icon: <Mountain className="w-8 h-8" />, title: "Mountain Hiking & Trekking", desc: "For adventure lovers, we can arrange mountain hikes, trekking, and nature walks, allowing you to experience Sri Lanka’s breathtaking mountains, forests, and natural beauty." },
                            { icon: <Umbrella className="w-8 h-8" />, title: "Beach & Coastal Tours", desc: "Enjoy Sri Lanka’s beautiful tropical beaches and discover the stunning coastline with comfortable and convenient transportation." },
                            { icon: <Calendar className="w-8 h-8" />, title: "Complete Travel Arrangements", desc: "We can help arrange hotels, airport transfers, sightseeing, transportation, safari jeeps, boat safaris, whale watching, hiking tours, activities, and many other travel requirements." },
                            { icon: <ShieldCheck className="w-8 h-8" />, title: "Your Safety & Comfort", desc: "We provide a safe, reliable, and comfortable service throughout your journey. We are always ready to assist you and arrange the things you need." }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-6 group">
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotional Gallery */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Fleet & Promotions</h2>
                        <p className="text-gray-600">Check out our comfortable vehicles and special tour packages.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div
                            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-80 relative cursor-pointer"
                            onClick={() => setSelectedImage(t1)}
                        >
                            <img src={t1} alt="Disanayaka Taxi & Tour Prices" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div
                            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-80 relative cursor-pointer"
                            onClick={() => setSelectedImage(t3)}
                        >
                            <img src={t3} alt="Our Vehicle Fleet" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div
                            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-80 relative cursor-pointer"
                            onClick={() => setSelectedImage(t2)}
                        >
                            <img src={t2} alt="Explore Sri Lanka Tour Poster" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & CTA Section */}
            <section id="contact" className="py-20 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6">Whatever you want to experience in Sri Lanka, simply tell us what you need.</h2>
                    <p className="text-xl text-blue-100 mb-12">
                        We will arrange the transportation, tours, activities and other services for you as much as possible.
                    </p>

                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl inline-block text-center mb-8 max-w-3xl w-full">
                        <h3 className="text-3xl font-bold mb-3 text-blue-900">Disanayaka Taxi & Tour 🇱🇰</h3>
                        <p className="font-medium mb-10 text-gray-600 text-lg">
                            Your Journey, Our Priority. <br />
                            <span className="text-sm font-normal text-gray-500 mt-2 inline-block">Safe • Comfortable • Reliable • Friendly Service</span>
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
                            <a href="tel:+94760403545" className="flex items-center gap-3 text-lg bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-md transition-all hover:shadow-lg w-full sm:w-auto justify-center font-semibold group">
                                <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                Call Now
                            </a>
                            <a href="https://wa.me/94760403545" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl shadow-md transition-all hover:shadow-lg w-full sm:w-auto justify-center font-semibold group">
                                <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                WhatsApp
                            </a>
                            <a href="mailto:DisanayakaTaxiAndTour@gmail.com" className="flex items-center gap-3 text-lg bg-gray-100 hover:bg-gray-200 text-blue-900 px-8 py-4 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md w-full sm:w-auto justify-center font-semibold group">
                                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Popup / Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex justify-center items-center">
                        <button
                            className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white/70 hover:text-white text-4xl p-2 transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            aria-label="Close popup"
                        >
                            &times;
                        </button>
                        <img
                            src={selectedImage}
                            alt="Popup View"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
