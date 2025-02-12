"use client";

import React, { useState, useMemo } from 'react';
import ModelDetailsModal from '@/components/ModelDetailsModal';

interface Model {
  id: number;
  name: string;
  imageUrls: string[];
  height: string;
  measurements: string;
  age: number;
  experience: string;
}

// Seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Simple random number generator with seed
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

const BookingPage = () => {
  // Generate 100 mockup models with consistent data using seed
  const models: Model[] = useMemo(() => {
    const random = new SeededRandom(12345); // Use consistent seed

    return Array.from({ length: 100 }, (_, i) => {
      const height = Math.floor(165 + random.next() * 25);
      const bust = Math.floor(81 + random.next() * 10);
      const waist = Math.floor(58 + random.next() * 10);
      const hip = Math.floor(86 + random.next() * 10);
      const age = Math.floor(18 + random.next() * 12);
      const experiences = ['Beginner', 'Intermediate', 'Professional'];
      const experience = experiences[Math.floor(random.next() * experiences.length)];

      return {
        id: i + 1,
        name: `Model ${i + 1}`,
        imageUrls: ['', '', ''],
        height: `${height}cm`,
        measurements: `${bust}-${waist}-${hip}`,
        age,
        experience
      };
    });
  }, []); // Empty dependency array ensures this only runs once

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modelsPerPage = 10;
  const totalPages = Math.ceil(models.length / modelsPerPage);
  
  // Get current page models
  const getCurrentPageModels = () => {
    const startIndex = (currentPage - 1) * modelsPerPage;
    const endIndex = startIndex + modelsPerPage;
    return models.slice(startIndex, endIndex);
  };

  const openModal = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedModel(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book a Model</h1>
      
      {/* Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {getCurrentPageModels().map((model) => (
          <div
            key={model.id}
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
              <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Height: {model.height}</p>
                <p>Measurements: {model.measurements}</p>
                <p>Age: {model.age}</p>
                <p>Experience: {model.experience}</p>
              </div>
              <button 
                onClick={() => openModal(model)}
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
              // Show first page, last page, current page, and pages around current page
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

      {isModalOpen && selectedModel && (
        <ModelDetailsModal model={selectedModel} onClose={closeModal} />
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

export default BookingPage;
