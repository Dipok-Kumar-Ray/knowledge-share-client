import JoditEditor from 'jodit-react';
import { motion } from 'framer-motion';
import { useState } from "react";
import { Link } from 'react-router';

const Motion = () => {
  const [content, setContent] = useState('');

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-5 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Share Your Knowledge
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        className="text-center text-lg md:text-xl max-w-2xl mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Join our community of writers and readers. Express your ideas and explore articles from others.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/allArticle"
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 transition"
        >
          Explore Articles
        </Link>
      </motion.div>

      {/* Rich Text Editor Preview (Optional Showcase) */}
      <motion.div
        className="w-full max-w-2xl mt-10 bg-white rounded-xl shadow-lg p-4 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="font-bold text-center mb-2">Try Writing Here 👇</p>
        <JoditEditor
          value={content}
          onChange={newContent => setContent(newContent)}
        />
      </motion.div>
    </section>
  );
};

export default Motion;
