import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ setWeather }) {
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setErrorMessage("City not found! Please try again.");
        setIsLoading(false); 
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        setErrorMessage("Weather data not available for this location.");
        setIsLoading(false);
        return;
      }

      setWeather({
        city: geoData.results[0].name,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        time: weatherData.current_weather.time,
      });
      setCity(""); 

    } catch (err) {
      console.error("Failed to fetch weather:", err);
      setErrorMessage("Failed to fetch weather. Please try again later.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="flex w-full bg-white/20 backdrop-blur-md rounded-full shadow-lg p-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              fetchWeather();
            }
          }}
          className="flex-grow bg-transparent text-white placeholder-white/70 px-4 py-2 focus:outline-none rounded-full"
        />
        <button
          onClick={fetchWeather}
          disabled={isLoading || !city.trim()} 
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-md mt-2"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
