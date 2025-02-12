"use client";

import React, { useState, useMemo } from 'react';
import VillaDetailsModal from '@/components/VillaDetailsModal';

interface Villa {
  id: number;
  name: string;
  imageUrls: string[];
  location: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  amenities: string[];
}

// Seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

const locations = [
  'Miami Beach, FL',
  'South Beach, FL',
  'Palm Beach, FL',
  'Key Biscayne, FL',
  'Coral Gables, FL',
  'Fort Lauderdale, FL'
];

const amenities = [
  'Pool',
  'Beach Access',
  'Gym',
  'Spa',
  'Tennis Court',
  'Private Garden',
  'Ocean View',
  'Smart Home',
  'Wine Cellar',
  'Home Theater',
  'Private Chef',
  'Security System'
];

const VillasPage = () => {
  // Generate 100 mockup villas with consistent data using seed
  const villas: Villa[] = useMemo(() => {
    const random = new SeededRandom(54321); // Different seed from models

    return Array.from({ length: 100 }, (_, i) => {
      const numAmenities = Math.floor(4 + random.next() * 5); // 4-8 amenities
      const villaAmenities = new Set<string>();
      while (villaAmenities.size < numAmenities) {
        villaAmenities.add(amenities[Math.floor(random.next() * amenities.length)]);
      }

      return {
        id: i + 1,
        name: `Luxury Villa ${i + 1}`,
        imageUrls: ['', '', '', ''], // Placeholder for images
        location: locations[Math.floor(random.next() * locations.length)],
        bedrooms: Math.floor(3 + random.next() * 8), // 3-10 bedrooms
        bathrooms: Math.floor(3 + random.next() * 8), // 3-10 bathrooms
        price: Math.floor(1000 + random.next() * 9000), // $1000-$10000 per night
        amenities: Array.from(villaAmenities)
      };
    });
  }, []); // Empty dependency array ensures this only runs once

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const villasPerPage = 10;
  const totalPages = Math.ceil(villas.length / villasPerPage);
  
  // Get current page villas
  const getCurrentPageVillas = () => {
    const startIndex = (currentPage - 1) * villasPerPage;
    const endIndex = startIndex + villasPerPage;
    return villas.slice(startIndex, endIndex);
  };

  const openModal = (villa: Villa) => {
    setSelectedVilla(villa);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVilla(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Luxury Villas</h1>
      
      {/* Villas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getCurrentPageVillas().map((villa) => (
          <div
            key={villa.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Skeleton placeholder */}
            <div
              className="w-full h-48 bg-gray-200"
              style={{
                animation: 'skeleton 1.5s infinite linear'
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{villa.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Location: {villa.location}</p>
                <p>{villa.bedrooms} Bedrooms • {villa.bathrooms} Bathrooms</p>
                <p className="font-semibold">${villa.price.toLocaleString()}/night</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {villa.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                  {villa.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{villa.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => openModal(villa)}
                className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              return page === 1 || 
                     page === totalPages || 
                     Math.abs(page - currentPage) <= 2;
            })
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}
        </div>

        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedVilla && (
        <VillaDetailsModal villa={selectedVilla} onClose={closeModal} />
      )}

      <style jsx>{`
        @keyframes skeleton {
          0% { background-color: #f0f0f0; }
          50% { background-color: #ddd; }
          100% { background-color: #f0f0f0; }
        }
      `}</style>
    </div>
  );
};

export default VillasPage;
