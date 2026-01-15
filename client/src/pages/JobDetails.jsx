import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ApplyModal from '../components/ApplyModal';
import { MapPin, DollarSign, Calendar, Briefcase } from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/jobs/${id}`);
            setJob(res.data);
        } catch (error) {
            console.error('Error fetching job:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowApplyModal(true);
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!job) return <div className="text-center py-10">Job not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                            <div className="mt-2 flex items-center text-gray-500">
                                <Briefcase className="w-5 h-5 mr-2" />
                                <span className="text-lg">{job.recruiter?.name}</span>
                            </div>
                        </div>
                        {user?.role !== 'recruiter' && (
                            <button
                                onClick={handleApplyClick}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium transition-colors shadow-sm"
                            >
                                Apply Now
                            </button>
                        )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            {job.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="w-5 h-5 mr-2" />
                            {job.salary}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Calendar className="w-5 h-5 mr-2" />
                            Posted on {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                        <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                        <p className="text-gray-600 whitespace-pre-line">{job.requirements}</p>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.tags && Array.isArray(job.tags) && job.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showApplyModal && (
                <ApplyModal
                    job={job}
                    onClose={() => setShowApplyModal(false)}
                    onSuccess={() => {
                        alert('Application submitted successfully!');
                        // Optionally refresh state or redirect
                    }}
                />
            )}
        </div>
    );
};

export default JobDetails;
