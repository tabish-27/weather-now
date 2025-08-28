import { motion } from "framer-motion";

export default function WeatherCard({ weather }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1, 
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (!weather) {
    return null; 
  }

  return (
    <motion.div
      className="p-10 w-80 bg-white rounded-3xl text-gray-800 shadow-2xl flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-4xl font-black mb-2 leading-none text-center" variants={itemVariants}>
        {weather.city}
      </motion.h2>
      <motion.p className="text-8xl font-thin mb-4" variants={itemVariants}>
        {weather.temperature}°<span className="text-indigo-500">C</span>
      </motion.p>
      <motion.div className="flex justify-between w-full text-sm font-medium" variants={itemVariants}>
        <p className="flex items-center gap-1">💨 <span className="font-semibold">{weather.windspeed}</span> km/h</p>
        <p className="flex items-center gap-1">⏰ <span className="font-semibold">{weather.time.split('T')[1].substring(0, 5)}</span></p>
      </motion.div>
    </motion.div>
  );
}
