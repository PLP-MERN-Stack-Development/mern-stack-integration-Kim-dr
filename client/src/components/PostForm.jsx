import { useState, useEffect } from 'react';
import { categoryService } from '../services/api';

const generateSlug = (title) =>
  title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

const PostForm = ({ initialData = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: true,
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        excerpt: initialData.excerpt || '',
        category: initialData.category || '',
        tags: initialData.tags || '',
        isPublished: initialData.isPublished !== undefined ? initialData.isPublished : true,
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setErrorCategories('');
      const response = await categoryService.getAllCategories();
      console.log('Categories fetched:', response);
      
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
        console.log('Categories set:', response.data.length, 'categories');
      } else {
        setCategories([]);
        setErrorCategories('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
      setErrorCategories('Failed to load categories. Please refresh the page.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMIT ===');
    console.log('Current form data:', formData);
    
    // Validate category is selected
    if (!formData.category) {
      alert('Please select a category');
      return;
    }

    // Convert tags string to array
    const tagsArray = formData.tags
      ? formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    // Create FormData for multipart/form-data submission
    const submitData = new FormData();
    submitData.append('title', formData.title.trim());
    submitData.append('content', formData.content.trim());
    submitData.append('category', formData.category);
    submitData.append('isPublished', formData.isPublished);
    
    // Add the slug generation here
    submitData.append('slug', generateSlug(formData.title));
    
    if (formData.excerpt && formData.excerpt.trim()) {
      submitData.append('excerpt', formData.excerpt.trim());
    }
    
    if (tagsArray.length > 0) {
      submitData.append('tags', JSON.stringify(tagsArray));
    }
    
    if (selectedFile) {
      submitData.append('featuredImage', selectedFile);
    }

    console.log('Submitting FormData with:');
    for (let [key, value] of submitData.entries()) {
      console.log(`  ${key}:`, value);
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={100}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          placeholder="Enter post title"
        />
      </div>

      {/* Excerpt Field */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          maxLength={200}
          rows={2}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          placeholder="Brief description of the post"
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.excerpt.length}/200 characters
        </p>
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={12}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          placeholder="Write your post content here..."
        />
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        
        {loadingCategories ? (
          <div className="mt-1 p-3 bg-blue-50 text-blue-700 rounded-md">
            Loading categories...
          </div>
        ) : errorCategories ? (
          <div className="mt-1 p-3 bg-red-50 text-red-700 rounded-md">
            {errorCategories}
            <button
              type="button"
              onClick={fetchCategories}
              className="ml-2 underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="mt-1 p-3 bg-yellow-50 text-yellow-700 rounded-md">
            No categories available. Please run the seed script: <code>npm run seed</code>
          </div>
        ) : (
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 bg-white"
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
        
        {formData.category && (
          <p className="mt-1 text-sm text-green-600">
            ✓ Category selected
          </p>
        )}
      </div>

      {/* Featured Image Field */}
      <div>
        <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="file"
          id="featuredImage"
          name="featuredImage"
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-sm text-gray-500">
          Accepted formats: JPEG, PNG, GIF, WebP (Max 5MB)
        </p>
        {selectedFile && (
          <p className="mt-2 text-sm text-green-600">
            ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Tags Field */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          placeholder="React, JavaScript, Web Development"
        />
        <p className="mt-1 text-sm text-gray-500">
          Separate multiple tags with commas
        </p>
      </div>

      {/* Published Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
          Publish immediately
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="submit"
          disabled={loading || loadingCategories || categories.length === 0 || !formData.category}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </div>

      {/* Debug Info (Remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-xs">
          <p className="font-semibold mb-2">Debug Info:</p>
          <p>Categories loaded: {categories.length}</p>
          <p>Selected category: {formData.category || 'None'}</p>
          <p>Title length: {formData.title.length}</p>
          <p>Content length: {formData.content.length}</p>
        </div>
      )}
    </form>
  );
};

export default PostForm;