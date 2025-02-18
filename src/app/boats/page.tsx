"use client";

import React, { useState, useEffect } from 'react';
import BoatDetailsModal from '@/components/BoatDetailsModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BoatData } from '@/types/boat';
import { readBoatData } from '@/utils/csvParser';

export default function BoatsPage() {
  const [selectedBoat, setSelectedBoat] = useState<BoatData | null>(null);
  const [boats, setBoats] = useState<BoatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const boatData = await readBoatData();
        setBoats(boatData);
        setError(null);
      } catch (error) {
        console.error('Error loading boat data:', error);
        setError('Failed to load boat data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const boatsPerPage = 10;
  const totalPages = Math.ceil(boats.length / boatsPerPage);
  
  // Get current page boats
  const getCurrentPageBoats = () => {
    const startIndex = (currentPage - 1) * boatsPerPage;
    const endIndex = startIndex + boatsPerPage;
    return boats.slice(startIndex, endIndex);
  };

  const openModal = (boat: BoatData) => {
    setSelectedBoat(boat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBoat(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Luxury Boats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentPageBoats().map((boat) => (
          <div
            key={boat.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openModal(boat)}
          >
            <div className="relative h-64">
              <img
                src={boat.imageUrl || '/placeholder-boat.jpg'}
                alt={boat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{boat.name}</h2>
              <p className="text-gray-600 mb-2">{boat.location}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-lg font-bold text-blue-600">{boat.rate4hr}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(boat);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
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

      {isModalOpen && selectedBoat && (
        <BoatDetailsModal boat={selectedBoat} onClose={closeModal} />
      )}
    </div>
  );
}
