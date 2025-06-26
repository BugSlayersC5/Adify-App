import { useEffect, useState } from "react";

export default function SearchWithSuggestions({ value, onChange, placeholder, suggestions }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (!value) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [value, suggestions]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        className="w-full pl-10 pr-10 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-200"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute w-full bg-white shadow-md z-10 mt-1 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
              className="px-4 py-2 cursor-pointer bg-gray-700 text-shadow-teal-50 hover:bg-blue-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
