import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const baseStyle = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2",
        lg: "px-8 py-3 text-lg"
    };

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
        outline: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100",
        danger: "bg-red-50 text-red-600 hover:bg-red-100"
    };

    return (
        <button
            className={cn(baseStyle, sizes[size], variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
