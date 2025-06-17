// FilterSidebar.jsx
import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FilterSidebar() {
    // sideBar
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
            <button onClick={toggleSidebar} className="p-4 text-gray-700">
                <FaFilter />
            </button>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
                        <div className="flex items-center mt-1">
                            <FaSearch className="text-gray-500 mr-2" />
                            <input type="text" id="search" placeholder="Search ads..." className="border border-gray-300 rounded-md p-2 w-full" />
                        </div>
                    </div>
                    {/* Add more filter options here */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Apply Filters</button>
                </form>
            </div>
        </div>
    );


}