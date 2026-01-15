import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ApplyModal from '../components/ApplyModal';
import { MapPin, DollarSign, Calendar, Briefcase, Heart, Share2, Globe, Building } from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [relatedJobs, setRelatedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        fetchJob();
        fetchRelatedJobs();
        checkSavedStatus();
    }, [id, user]);

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

    const fetchRelatedJobs = async () => {
        try {
            const res = await api.get(`/jobs/${id}/related`);
            setRelatedJobs(res.data);
        } catch (error) {
            console.error('Error fetching related jobs:', error);
        }
    };

    const checkSavedStatus = async () => {
        if (user) {
            try {
                const res = await api.get(`/saved-jobs/check/${id}`);
                setIsSaved(res.data.saved);
            } catch (error) {
                console.error('Error checking saved status', error);
            }
        } else {
            // Check localStorage
            const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            setIsSaved(saved.includes(id));
        }
    };

    const toggleSave = async () => {
        if (user) {
            try {
                const res = await api.post('/saved-jobs/toggle', { job_id: id });
                setIsSaved(res.data.saved);
            } catch (error) {
                console.error('Error toggling save', error);
            }
        } else {
            // Toggle in localStorage
            const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            let newSaved;
            if (saved.includes(id)) {
                newSaved = saved.filter(jobId => jobId !== id);
                setIsSaved(false);
            } else {
                newSaved = [...saved, id];
                setIsSaved(true);
            }
            localStorage.setItem('savedJobs', JSON.stringify(newSaved));
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: job.title,
                    text: `Check out this job: ${job.title} at ${job.recruiter?.company_name || 'Company'}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
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
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                                <div className="mt-2 flex items-center text-gray-500">
                                    <Briefcase className="w-5 h-5 mr-2" />
                                    <span className="text-lg">{job.recruiter?.company_name || job.recruiter?.name}</span>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={toggleSave}
                                    className={`p-3 rounded-full border ${isSaved ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                                    title={isSaved ? "Unsave" : "Save"}
                                >
                                    <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-indigo-600"
                                    title="Share"
                                >
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-md">
                                <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                                {job.location}
                            </div>
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-md">
                                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                                {job.salary}
                            </div>
                            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-md">
                                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                Posted {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                            <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                                {job.description}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                            <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                                {job.requirements}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {job.tags && Array.isArray(job.tags) && job.tags.map((tag, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {user?.role !== 'recruiter' && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <button
                                    onClick={handleApplyClick}
                                    className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 font-bold text-lg transition-colors shadow-md"
                                >
                                    Apply for this Job
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Company Profile */}
                    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Building className="w-5 h-5 mr-2" />
                            Company Profile
                        </h3>
                        <div className="flex items-center mb-4">
                            <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-500">
                                {job.recruiter?.company_logo ? (
                                    <img src={job.recruiter.company_logo} alt="Logo" className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    (job.recruiter?.company_name || job.recruiter?.name || 'C').charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="ml-4">
                                <h4 className="font-bold text-gray-900">{job.recruiter?.company_name || job.recruiter?.name}</h4>
                                {job.recruiter?.company_website && (
                                    <a href={job.recruiter.company_website} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline flex items-center mt-1">
                                        <Globe className="w-3 h-3 mr-1" /> Website
                                    </a>
                                )}
                            </div>
                        </div>
                        {job.recruiter?.company_description && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                                {job.recruiter.company_description}
                            </p>
                        )}
                    </div>

                    {/* Related Jobs */}
                    {relatedJobs.length > 0 && (
                        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Jobs</h3>
                            <div className="space-y-4">
                                {relatedJobs.map((related) => (
                                    <Link key={related.id} to={`/jobs/${related.id}`} className="block group">
                                        <div className="border border-gray-100 rounded-md p-3 hover:border-indigo-300 transition-colors">
                                            <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{related.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1">{related.recruiter?.company_name || related.recruiter?.name}</p>
                                            <div className="flex items-center mt-2 text-xs text-gray-400">
                                                <MapPin className="w-3 h-3 mr-1" /> {related.location}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showApplyModal && (
                <ApplyModal
                    job={job}
                    onClose={() => setShowApplyModal(false)}
                    onSuccess={() => {
                        alert('Application submitted successfully!');
                    }}
                />
            )}
        </div>
    );
};

export default JobDetails;
