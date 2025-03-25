"use client";

import React, { useState } from 'react';
import VillaDetailsModal from '@/components/VillaDetailsModal';
import { Villa, villas } from '@/data/villas';

const VillasPage = () => {
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const villasPerPage = 9; // Show 9 villas per page (3x3 grid)
  const totalPages = Math.ceil(villas.length / villasPerPage);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentPageVillas().map((villa, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Villa Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={villa.images[0]}
                alt={villa.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{villa.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {villa.isWaterfront && <span className="text-blue-500">Waterfront - </span>}
                  {villa.location}
                </p>
                <p className="font-semibold">${villa.price?.toLocaleString()} per night + {villa.tax}% tax</p>
                <p>{villa.minStayWeeks} week minimum</p>
                <p>${villa.exitCleaningFee?.toLocaleString()} exit cleaning / ${villa.securityDeposit?.toLocaleString()} security deposit</p>
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
    </div>
  );
};

export default VillasPage;
