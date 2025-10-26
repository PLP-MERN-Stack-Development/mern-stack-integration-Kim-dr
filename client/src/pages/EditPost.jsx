import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { postService } from '../services/api';

const EditPost = () => {
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  //  console.log('Fetched post ID:', response.data._id);
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPost(id);

      console.log('Fetched post: ', response.data);
      // Format the post data for the form
      const formattedPost = {
        title: response.data.title,
        content: response.data.content,
        excerpt: response.data.excerpt || '',
        category: response.data.category._id,
        tags: response.data.tags ? response.data.tags.join(', ') : '',
        isPublished: response.data.isPublished,
      };
      
      setPost(formattedPost);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSubmitLoading(true);
    setError('');

    // ✅ Guard clause to prevent undefined postId
  if (!id) {
    setError('Post ID is missing. Please wait for the post to load.');
    setSubmitLoading(false);
    return;
  }


    console.log('Updating post with ID: ', id);

    try {
      const response = await postService.updatePost(id, formData);
      navigate(`/posts/${response.data.slug || response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {post && (
          <PostForm
            initialData={post}
            onSubmit={handleSubmit}
            loading={submitLoading}
          />
        )}
      </div>
    </div>
  );
};

export default EditPost;