import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-500 py-16 px-4"
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Updated with Market Trends 🛒
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Subscribe to our newsletter and get daily price updates straight to your inbox.
        </p>

        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-teal-700 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition"
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;
