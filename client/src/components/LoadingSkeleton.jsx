import React from 'react'

function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {Array(count).fill().map((_, index) => (
        <div key={index} className="flex flex-col rounded-sm overflow-hidden shadow animate-pulse">
          {/* Image placeholder */}
          <div className="bg-gray-400 h-48 w-full"></div>
          
          {/* Content placeholder */}
          <div className="p-2 space-y-2">
            {/* Title */}
            <div className="h-5 bg-gray-400 rounded w-3/4"></div>

            {/* Description line */}
            <div className="h-3 bg-gray-400 rounded w-full"></div>
            
            {/* Price */}
            <div className="h-4 bg-gray-400 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton