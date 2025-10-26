const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');
const generateSlug = (title) =>
  title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Post.deleteMany();

    console.log('Data cleared...');

    // Create users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        username: 'admin',
        password: 'password123',
        role: 'admin',
        bio: 'I am the administrator of this blog.',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'Tech enthusiast and blogger.',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        bio: 'Writer and content creator.',
      },
    ]);

    console.log('Users created...');

    // Create categories
const categories = await Category.create([
  {
    name: 'Technology',
    description: 'Posts about technology and innovation',
    slug: 'technology',
    color: '#3B82F6',
  },
  {
    name: 'Travel',
    description: 'Travel stories and guides',
    slug: 'travel',
    color: '#10B981',
  },
  {
    name: 'Food',
    description: 'Recipes and food reviews',
    slug: 'food',
    color: '#F59E0B',
  },
  {
    name: 'Lifestyle',
    description: 'Life tips and personal stories',
    slug: 'lifestyle',
    color: '#8B5CF6',
  },
  {
    name: 'Business',
    description: 'Business insights and entrepreneurship',
    slug: 'business',
    color: '#EF4444',
  },
]);

    console.log('Categories created...');

    // Create posts
    const posts = await Post.create([
      {
        title: 'Getting Started with React Hooks',
        slug: generateSlug('Getting Started with React Hooks'),
        content: `React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can improve your code.

useState is the most basic hook that allows you to add state to functional components. Before hooks, you had to convert your functional component to a class component to use state.

useEffect is another crucial hook that handles side effects in your components. It combines the functionality of componentDidMount, componentDidUpdate, and componentWillUnmount.

Custom hooks allow you to extract component logic into reusable functions. This is one of the most powerful features of React Hooks.`,
        excerpt: 'Learn how to use React Hooks to write better, more maintainable code.',
        author: users[0]._id,
        category: categories[0]._id,
        tags: ['React', 'JavaScript', 'Web Development'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'Top 10 Travel Destinations for 2024',
        slug: generateSlug('Top 10 Travel Destinations for 2024'),
        content: `Planning your next vacation? Here are the top 10 destinations you should consider for 2024.

1. Bali, Indonesia - Known for its beautiful beaches, rice terraces, and vibrant culture.
2. Iceland - Experience the Northern Lights and stunning natural landscapes.
3. Tokyo, Japan - A perfect blend of traditional and modern culture.
4. Santorini, Greece - Famous for its white-washed buildings and breathtaking sunsets.
5. New Zealand - Adventure awaits with incredible hiking and outdoor activities.

Each destination offers unique experiences that will create lasting memories.`,
        excerpt: 'Discover the most amazing places to visit this year.',
        author: users[1]._id,
        category: categories[1]._id,
        tags: ['Travel', 'Adventure', 'Vacation'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'The Art of Making Perfect Pasta',
        slug: generateSlug('The Art of Making Perfect Pasta'),
        content: `Making perfect pasta is both an art and a science. Here's everything you need to know.

First, always use plenty of salted water. The general rule is 1 liter of water and 10 grams of salt per 100 grams of pasta.

Never add oil to the cooking water. This is a common myth. Oil prevents the sauce from adhering to the pasta.

Cook pasta al dente - it should have a slight bite to it. This usually means cooking for 1-2 minutes less than the package instructions.

Always save some pasta water before draining. This starchy water is perfect for adjusting the consistency of your sauce.`,
        excerpt: 'Master the technique of cooking pasta like an Italian chef.',
        author: users[2]._id,
        category: categories[2]._id,
        tags: ['Cooking', 'Italian', 'Recipe'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'Minimalist Living: Less is More',
        slug: generateSlug('Minimalist Living: Less is More'),
        content: `Minimalism isn't about having nothing; it's about having only what adds value to your life.

Start by decluttering one room at a time. Don't try to tackle your entire home in one day.

Ask yourself: Does this item serve a purpose or bring me joy? If the answer is no, it's time to let it go.

Digital minimalism is equally important. Unsubscribe from unnecessary emails and delete apps you don't use.

The benefits of minimalist living include reduced stress, more time, and increased focus on what truly matters.`,
        excerpt: 'Discover how minimalism can transform your life and bring more happiness.',
        author: users[1]._id,
        category: categories[3]._id,
        tags: ['Minimalism', 'Lifestyle', 'Productivity'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'Building a Successful Startup in 2024',
        slug: generateSlug('Building a Successful Startup in 2024'),
        content: `Starting a business has never been more accessible, but success requires careful planning and execution.

Validate your idea before investing significant time and money. Talk to potential customers and understand their pain points.

Build a minimum viable product (MVP) to test your concept. Don't wait for perfection before launching.

Focus on customer acquisition and retention. A great product means nothing without customers.

Manage your finances carefully. Many startups fail not because of bad ideas, but because they run out of money.

Build a strong team. Surround yourself with people who complement your skills and share your vision.`,
        excerpt: 'Essential tips for entrepreneurs looking to launch their startup.',
        author: users[0]._id,
        category: categories[4]._id,
        tags: ['Startup', 'Entrepreneurship', 'Business'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'Understanding Node.js Event Loop',
        slug: generateSlug('Understanding Node.js Event Loop'),
        content: `The Node.js event loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.

When Node.js starts, it initializes the event loop, processes the provided input script, and then begins processing the event loop.

The event loop has several phases: timers, pending callbacks, idle/prepare, poll, check, and close callbacks.

Understanding the event loop is crucial for writing efficient Node.js applications and avoiding common pitfalls.`,
        excerpt: 'Deep dive into how Node.js handles asynchronous operations.',
        author: users[0]._id,
        category: categories[0]._id,
        tags: ['Node.js', 'JavaScript', 'Backend'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
        slug: generateSlug('Sustainable Travel: How to Reduce Your Carbon Footprint'),
        content: `Traveling doesn't have to harm the environment. Here are ways to make your trips more sustainable.

Choose direct flights when possible. Takeoffs and landings produce the most emissions.

Use public transportation, walk, or bike at your destination instead of renting a car.

Stay in eco-friendly accommodations that prioritize sustainability.

Support local businesses and communities. Buy from local artisans and eat at local restaurants.

Reduce plastic waste by carrying a reusable water bottle and shopping bag.`,
        excerpt: 'Travel responsibly and minimize your environmental impact.',
        author: users[2]._id,
        category: categories[1]._id,
        tags: ['Travel', 'Sustainability', 'Environment'],
        isPublished: true,
        featuredImage: 'default-post.jpg',
      },
      {
        title: 'Draft: Upcoming Food Festival Guide',
        slug: generateSlug('Draft: Upcoming Food Festival Guide'),
        content: `This is a draft post about upcoming food festivals. Still working on the details...`,
        excerpt: 'A comprehensive guide to food festivals around the world.',
        author: users[2]._id,
        category: categories[2]._id,
        tags: ['Food', 'Festival', 'Events'],
        isPublished: false,
        featuredImage: 'default-post.jpg',
      },
    ]);

    console.log('Posts created...');

    // Add comments to some posts
    await posts[0].addComment(users[1]._id, 'Great article! Very helpful for beginners.');
    await posts[0].addComment(users[2]._id, 'I love using React Hooks. They make code so much cleaner!');
    await posts[1].addComment(users[0]._id, 'Bali is definitely on my bucket list!');
    await posts[2].addComment(users[1]._id, 'Thanks for the tips! My pasta always turns out mushy.');

    console.log('Comments added...');
    console.log('Seed data successfully loaded!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();