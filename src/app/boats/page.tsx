"use client";

import React, { useState, useMemo } from 'react';
import BoatDetailsModal from '@/components/BoatDetailsModal';

interface Boat {
  id: number;
  name: string;
  imageUrls: string[];
  type: string;
  length: string;
  capacity: number;
  price: number;
  features: string[];
  location: string;
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
  'Miami Marina',
  'Fort Lauderdale Marina',
  'Palm Beach Marina',
  'Key Biscayne Marina',
  'Miami Beach Marina',
  'Coconut Grove Marina'
];

const boatTypes = [
  'Yacht',
  'Sailboat',
  'Catamaran',
  'Motor Boat',
  'Sport Fishing Boat',
  'Speed Boat'
];

const features = [
  'Air Conditioning',
  'WiFi',
  'Kitchen',
  'Sound System',
  'BBQ Grill',
  'Jet Ski',
  'Fishing Equipment',
  'Snorkeling Gear',
  'Water Toys',
  'Sun Deck',
  'Swimming Platform',
  'Crew Included'
];

const BoatsPage = () => {
  // Generate 100 mockup boats with consistent data using seed
  const boats: Boat[] = useMemo(() => {
    const random = new SeededRandom(98765); // Different seed from models and villas

    return Array.from({ length: 100 }, (_, i) => {
      const numFeatures = Math.floor(4 + random.next() * 5); // 4-8 features
      const boatFeatures = new Set<string>();
      while (boatFeatures.size < numFeatures) {
        boatFeatures.add(features[Math.floor(random.next() * features.length)]);
      }

      const lengthFeet = Math.floor(30 + random.next() * 120); // 30-150 feet

      return {
        id: i + 1,
        name: `${boatTypes[Math.floor(random.next() * boatTypes.length)]} ${i + 1}`,
        imageUrls: ['', '', '', ''], // Placeholder for images
        type: boatTypes[Math.floor(random.next() * boatTypes.length)],
        length: `${lengthFeet} ft`,
        capacity: Math.floor(4 + random.next() * 28), // 4-32 people
        price: Math.floor(1000 + random.next() * 14000), // $1000-$15000 per day
        features: Array.from(boatFeatures),
        location: locations[Math.floor(random.next() * locations.length)]
      };
    });
  }, []); // Empty dependency array ensures this only runs once

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boatsPerPage = 10;
  const totalPages = Math.ceil(boats.length / boatsPerPage);
  
  // Get current page boats
  const getCurrentPageBoats = () => {
    const startIndex = (currentPage - 1) * boatsPerPage;
    const endIndex = startIndex + boatsPerPage;
    return boats.slice(startIndex, endIndex);
  };

  const openModal = (boat: Boat) => {
    setSelectedBoat(boat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBoat(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Luxury Boats</h1>
      
      {/* Boats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getCurrentPageBoats().map((boat) => (
          <div
            key={boat.id}
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
              <h3 className="text-lg font-semibold mb-2">{boat.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Type: {boat.type}</p>
                <p>Length: {boat.length}</p>
                <p>Capacity: {boat.capacity} people</p>
                <p>Location: {boat.location}</p>
                <p className="font-semibold">${boat.price.toLocaleString()}/day</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {boat.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {boat.features.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{boat.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => openModal(boat)}
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

      {isModalOpen && selectedBoat && (
        <BoatDetailsModal boat={selectedBoat} onClose={closeModal} />
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

export default BoatsPage;
