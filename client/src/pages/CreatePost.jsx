import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { postService } from '../services/api';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Add more detailed logging
      console.log('Submitting form data:', Object.fromEntries(formData));
      
      const response = await postService.createPost(formData);
      console.log('Success response:', response);
      navigate(`/posts/${response.data.slug || response.data._id}`);
    } catch (err) {
      console.error('Error creating post:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      
      // More detailed error message
      const errorMessage = err.response?.data?.error 
        ? `Server error: ${err.response.data.error}`
        : err.response?.data?.message 
        ? err.response.data.message
        : 'Failed to create post. Please check the server logs.';
        
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <PostForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreatePost;