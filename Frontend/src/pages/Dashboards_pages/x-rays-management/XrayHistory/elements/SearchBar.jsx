"use client"
import { FiSearch, FiX } from "react-icons/fi"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Search by patient name, body part, or doctor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
