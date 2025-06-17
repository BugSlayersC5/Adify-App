import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 text-yellow-500 transition-all duration-300 ${
            isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-blue-500 transition-all duration-300 ${
            isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;