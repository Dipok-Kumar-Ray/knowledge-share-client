import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: 'Mastering React for Beginners',
    excerpt: 'Learn the fundamentals of React.js and build dynamic web apps with ease...',
    author: 'John Doe',
    date: '2025-06-15',
  },
  {
    id: 2,
    title: 'The Future of AI in Everyday Life',
    excerpt: 'Artificial intelligence is becoming increasingly integrated into our daily routines...',
    author: 'Jane Smith',
    date: '2025-06-14',
  },
  {
    id: 3,
    title: 'Top 10 CSS Tricks Every Developer Should Know',
    excerpt: 'Enhance your UI with these powerful and lesser-known CSS techniques...',
    author: 'Emily Johnson',
    date: '2025-06-13',
  },
  {
    id: 4,
    title: 'Understanding JavaScript Closures',
    excerpt: 'Closures are a fundamental concept that every JavaScript developer must master...',
    author: 'Michael Brown',
    date: '2025-06-12',
  },
  {
    id: 5,
    title: 'A Guide to Responsive Web Design',
    excerpt: 'Make your websites look great on all devices with these responsive design principles...',
    author: 'Sarah Wilson',
    date: '2025-06-11',
  },
  {
    id: 6,
    title: 'Introduction to Node.js for Backend Development',
    excerpt: 'Discover how Node.js can help you build scalable backend applications easily...',
    author: 'David Lee',
    date: '2025-06-10',
  },
  {
    id: 7,
    title: 'Building Scalable Microservices',
    excerpt: 'Learn how microservices architecture can help scale your applications efficiently...',
    author: 'Olivia Martinez',
    date: '2025-06-09',
  },
  {
    id: 8,
    title: 'The Power of TypeScript in Modern Development',
    excerpt: 'TypeScript brings strong typing to JavaScript, making your codebase more reliable...',
    author: 'Chris Evans',
    date: '2025-06-08',
  },
];

const FeaturedArticles = () => {
  return (
    <section className="py-16 px-5">
      <div className="w-11/12 mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Articles
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="rounded-2xl shadow-lg p-6 hover:shadow-2xl transition bg-white dark:bg-gray-800 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400
                  transition-all duration-500 ease-out
                  group-hover:text-transparent group-hover:bg-clip-text 
                  group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500
                  transform group-hover:-translate-y-1"
              >
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                By <span className="font-medium">{article.author}</span> ·{' '}
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
