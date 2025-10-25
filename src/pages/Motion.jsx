import JoditEditor from "jodit-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

const Motion = () => {
  const [content, setContent] = useState("");

  return (
    // Added top padding to perfectly offset fixed navbar
    <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center min-h-screen pt-32 md:pt-36 overflow-hidden">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center mb-4 leading-tight"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Share Your Knowledge with the World 🌍
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        className="text-center text-lg md:text-xl max-w-2xl mb-8 text-white/90"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Join our growing community of creators — write, inspire, and explore
        brilliant ideas from around the globe.
      </motion.p>

      {/* CTA Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/allArticle"
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition-all duration-300"
        >
          Explore Articles
        </Link>
      </motion.div>

      {/* Rich Text Editor Section */}
      <motion.div
        className="w-full max-w-2xl mt-12 bg-white rounded-xl shadow-2xl p-5 text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <p className="font-bold text-center mb-3 text-gray-700">
          ✍️ Try Writing Something Creative Below
        </p>
        <JoditEditor
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </motion.div>
    </section>
  );
};

export default Motion;
