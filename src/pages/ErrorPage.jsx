import { motion } from 'framer-motion';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white px-5">
      {/* Animated Image / Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1 }}
        className="mb-6"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
          alt="Lost in Knowledge"
          className="w-48 h-48"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Lost in Knowledge?
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-lg md:text-xl mb-8 text-center max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        The page you’re looking for doesn’t exist or might have been moved. Let’s guide you back!
      </motion.p>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
};

export default ErrorPage;
