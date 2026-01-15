import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar } from 'lucide-react';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Link to={`/jobs/${job.id}`} className="hover:text-indigo-600">
                            {job.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{job.recruiter?.name || 'Company Name'}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Full-time
                </span>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                </div>
                <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(job.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {job.tags && Array.isArray(job.tags) && job.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-4">
                <Link
                    to={`/jobs/${job.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    View Details &rarr;
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
