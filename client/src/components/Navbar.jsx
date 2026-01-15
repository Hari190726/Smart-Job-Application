import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-indigo-600 font-bold text-xl">
                            <Briefcase className="w-6 h-6 mr-2" />
                            SmartJobPortal
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 font-medium">Find Jobs</Link>
                        {user ? (
                            <>
                                {user.role === 'recruiter' && (
                                    <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                                )}
                                {user.role === 'candidate' && (
                                    <Link to="/my-applications" className="text-gray-600 hover:text-indigo-600 font-medium">My Applications</Link>
                                )}
                                <div className="flex items-center space-x-2 ml-4">
                                    <span className="text-sm text-gray-500">Hi, {user.name}</span>
                                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
