import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r  to-purple-50 px-5">
      <div className="w-full mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have questions or want to collaborate with us? Fill out the form below, or reach us via email or phone.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <motion.form
            className=" shadow-lg rounded-xl p-6 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Your message..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <motion.button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-4  shadow-lg rounded-xl p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="font-semibold text-blue-700">Email</h3>
              <p className="text-gray-600">support@eduhive.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Phone</h3>
              <p className="text-gray-600">+880 1234 567 890</p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-700">Address</h3>
              <p className="text-gray-600">
                123 EduHive Avenue, Dhaka, Bangladesh
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
