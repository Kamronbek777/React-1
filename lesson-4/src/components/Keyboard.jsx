import React, { useState, useEffect } from 'react';

const Keyboard = () => {
  const [pressedKey, setPressedKey] = useState('');
  const [activeKeys, setActiveKeys] = useState({});
  const [inputText, setInputText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState(30); // Default time limit 30 seconds
  const [testStarted, setTestStarted] = useState(false);
  const [layout, setLayout] = useState('en'); // Toggle between 'en' (English) and 'ru' (Russian)

  // Keyboard layouts for English and Russian
  const layouts = {
    en: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      [' ']
    ],
    ru: [
      ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з'],
      ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж'],
      ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
      [' ']
    ]
  };

  // Function to start the test
  const startTest = () => {
    setTestStarted(true);
    setTimeLeft(selectedTime); // Set the countdown based on user selection
    setInputText(''); // Clear input when test starts
    setWpm(0); // Reset WPM
  };

  // Handle typing and calculate WPM when the test is running
  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && testStarted) {
      // When time runs out, calculate WPM
      const wordsTyped = inputText.trim().split(/\s+/).length;
      setWpm(Math.round((wordsTyped / selectedTime) * 60)); // WPM calculation
      setTestStarted(false); // Stop test
    }
  }, [timeLeft, testStarted, inputText, selectedTime]);

  // Handle key press events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (testStarted && timeLeft > 0) {
        setPressedKey(event.key);
        setActiveKeys((prevActiveKeys) => ({ ...prevActiveKeys, [event.key]: true }));
      }
    };

    const handleKeyUp = (event) => {
      setActiveKeys((prevActiveKeys) => ({ ...prevActiveKeys, [event.key]: false }));
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [testStarted, timeLeft]);

  const handleKeyClick = (key) => {
    if (testStarted && timeLeft > 0) {
      setPressedKey(key);
      setActiveKeys((prevActiveKeys) => ({ ...prevActiveKeys, [key]: true }));
      setTimeout(() => {
        setActiveKeys((prevActiveKeys) => ({ ...prevActiveKeys, [key]: false }));
      }, 200);

      setInputText((prevText) => prevText + key); // Add key to input text
    }
  };

  // Toggle between English and Russian layouts
  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === 'en' ? 'ru' : 'en'));
    setInputText(''); // Clear input when switching layout
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Select time limit for the test */}
      <div className="flex items-center gap-4">
        <label className="text-lg font-semibold">Choose time limit:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          className="p-2 border-2 border-gray-300 rounded-md"
        >
          <option value={15}>15 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
        </select>
      </div>

      {/* Button to start/restart test */}
      <button
        onClick={startTest}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {testStarted ? 'Restart Test' : 'Start Test'}
      </button>

      {/* Typing Speed Display */}
      <p className={`text-lg font-semibold ${wpm > 40 ? 'text-green-500' : wpm > 20 ? 'text-yellow-500' : 'text-red-500'}`}>
        Speed: {wpm} WPM
      </p>

      {/* Countdown Timer */}
      <p className="text-lg font-semibold text-gray-700">Time left: {timeLeft}s</p>

      {/* Input Field */}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-64 p-2 border-2 border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-blue-400 transition-colors"
        placeholder="Type here..."
        disabled={timeLeft === 0}
      />

      {/* Keyboard Layout */}
      {layouts[layout].map((row, index) => (
        <div key={index} className="flex gap-2">
          {row.map((key) => (
            <kbd
              key={key}
              className={`kbd px-4 py-2 rounded-md text-lg font-semibold cursor-pointer select-none transition-transform transform ${
                activeKeys[key] ? 'bg-blue-500 text-white scale-105' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'
              }`}
              onClick={() => handleKeyClick(key)}
            >
              {key === ' ' ? 'Space' : key}
            </kbd>
          ))}
        </div>
      ))}

      {/* Pressed Key */}
      <p className="text-lg text-gray-600 mt-2">Pressed key: {pressedKey}</p>

      {/* Button to switch layout */}
      <button
        onClick={toggleLayout}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {layout === 'en' ? 'Switch to Russian' : 'Switch to English'}
      </button>
    </div>
  );
};

export default Keyboard;