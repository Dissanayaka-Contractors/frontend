import React, { useState } from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const NavItem = ({ to, label }: { to: string, label: string }) => (
        <RouterNavLink
            to={to}
            className={({ isActive }) => cn(
                "font-medium transition-colors hover:text-blue-600",
                isActive ? "text-blue-600" : "text-gray-600"
            )}
            onClick={() => setMobileMenuOpen(false)}
        >
            {label}
        </RouterNavLink>
    );

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src="/logo-sm.png" alt="Dissanayaka Contractors" className="h-14 md:h-20 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <NavItem to="/" label="Home" />
                    <NavItem to="/about" label="About Us" />
                    <NavItem to="/careers" label="Careers" />
                    <NavItem to="/contact" label="Contact" />
                    {user?.role === 'admin' && (
                        <NavItem to="/admin" label="Applications" />
                    )}
                </div>

                {/* Auth & Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <UserIcon size={16} /> {user.username}
                            </span>
                            <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" size="sm">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 flex flex-col gap-4 px-4">
                    <NavItem to="/" label="Home" />
                    <NavItem to="/about" label="About Us" />
                    <NavItem to="/careers" label="Careers" />
                    <NavItem to="/contact" label="Contact" />
                    {user?.role === 'admin' && (
                        <NavItem to="/admin" label="Applications" />
                    )}
                    <div className="border-t border-gray-100 pt-4 mt-2">
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <UserIcon size={16} /> {user.username}
                                </div>
                                <Button variant="outline" onClick={logout} className="w-full">Logout</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full">Register</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
