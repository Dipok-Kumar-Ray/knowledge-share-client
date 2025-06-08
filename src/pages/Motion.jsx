import { motion } from 'framer-motion';

import { Link } from "react-router";



export default function Motion() {
  return (
    <section className="relative bg-gradient-to-tr from-indigo-100 via-sky-100 to-white py-20 px-6 md:px-12 text-center">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          Share Your Knowledge
        </motion.h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Empower learners around the world by sharing your valuable insights, tutorials, and ideas.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/articles"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition"
          >
            Explore Articles
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
