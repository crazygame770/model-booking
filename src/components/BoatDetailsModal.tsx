import React from 'react';
import { BoatData } from '@/types/boat';

interface BoatDetailsModalProps {
  boat: BoatData;
  onClose: () => void;
}

const BoatDetailsModal: React.FC<BoatDetailsModalProps> = ({ boat, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{boat.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={boat.imageUrl || '/placeholder-boat.jpg'}
                alt={boat.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Rates</h3>
                <div className="space-y-2">
                  <p>4 Hours: {boat.rate4hr}</p>
                  <p>6 Hours: {boat.rate6hr}</p>
                  <p>8 Hours: {boat.rate8hr}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Location</p>
                  <p>{boat.location}</p>
                </div>
                <div>
                  <p className="font-medium">Description</p>
                  <p className="whitespace-pre-line">{boat.presentation}</p>
                </div>
                {boat.pdf && (
                  <div>
                    <a
                      href={boat.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      View PDF Brochure
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatDetailsModal;
