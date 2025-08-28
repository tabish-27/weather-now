import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx"; 
import WeatherCard from "./components/WeatherCard.jsx"; 
import { motion } from "framer-motion";

export default function App() {
  const [weather, setWeather] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg"
      >
        🌤️ Weather Now
      </motion.h1>

      <SearchBar setWeather={setWeather} />

      {weather && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WeatherCard weather={weather} />
        </motion.div>
      )}
    </div>
  );
}
