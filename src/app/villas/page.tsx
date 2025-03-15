"use client";

import React, { useState, useMemo } from 'react';
import VillaDetailsModal from '@/components/VillaDetailsModal';

interface Villa {
  id: number;
  name: string;
  imageUrls: string[];
  location: string;
  isWaterfront: boolean;
  price: number;
  tax: number;
  exitCleaningFee: number;
  securityDeposit: number;
  minStayWeeks: number;
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

const VillasPage = () => {
  // Generate 100 mockup villas with consistent data using seed
  const villas: Villa[] = useMemo(() => {
    const random = new SeededRandom(54321); // Different seed from models

    return Array.from({ length: 100 }, (_, i) => {
      return {
        id: i + 1,
        name: `Villa ${i + 1}`,
        imageUrls: ['', '', '', ''], // Placeholder for images
        location: locations[Math.floor(random.next() * locations.length)],
        isWaterfront: random.next() > 0.5,
        price: Math.floor(8000 + random.next() * 4500), // $8000-$12500 per night
        tax: 14, // 14% tax
        exitCleaningFee: 500,
        securityDeposit: 20000,
        minStayWeeks: 1
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
                <p>
                  {villa.isWaterfront && <span className="text-blue-500">Waterfront - </span>}
                  {villa.location}
                </p>
                <p className="font-semibold">${villa.price.toLocaleString()} per night + {villa.tax}% tax</p>
                <p>{villa.minStayWeeks} week minimum</p>
                <p>${villa.exitCleaningFee.toLocaleString()} exit cleaning / ${villa.securityDeposit.toLocaleString()} security deposit</p>
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
