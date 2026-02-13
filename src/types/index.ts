export interface Job {
    id: number;
    title: string;
    type: string; // e.g., Full-time, Contract, Temporary
    location: string;
    description: string;
    salary: string;
    postedDate: string;
    keywords: string[];
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    text: string;
}

export interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}
