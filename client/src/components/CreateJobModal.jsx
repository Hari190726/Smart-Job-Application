import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../api/axios';
import { X } from 'lucide-react';

const CreateJobModal = ({ onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError('');

            // Convert tags string to array
            const tagsArray = data.tags.split(',').map(tag => tag.trim());

            await api.post('/jobs', { ...data, tags: tagsArray });
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Post a New Job</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input
                                    {...register('title', { required: 'Title is required' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    {...register('location', { required: 'Location is required' })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                                <input
                                    {...register('salary')}
                                    placeholder="e.g. $50k - $80k"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    rows={4}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                                <textarea
                                    {...register('requirements', { required: 'Requirements are required' })}
                                    rows={4}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.requirements && <span className="text-red-500 text-sm">{errors.requirements.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                <input
                                    {...register('tags')}
                                    placeholder="React, Node.js, Remote"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateJobModal;
