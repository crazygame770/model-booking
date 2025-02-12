"use client";

import React, { useState } from 'react';
import ModelDetailsModal from '@/components/ModelDetailsModal';

interface Model {
  id: number;
  name: string;
  imageUrls: string[];
}

const BookingPage = () => {
  // Placeholder data for models
  const models: Model[] = [
    { id: 1, name: 'Model 1', imageUrls: ['', '', ''] },
    { id: 2, name: 'Model 2', imageUrls: ['', '', ''] },
    { id: 3, name: 'Model 3', imageUrls: ['', '', ''] },
  ];

  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedModel(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Book a Model</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {models.map((model) => (
          <div
            key={model.id}
            style={{
              width: '200px',
              margin: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
            }}
            className="model-card"
          >
            {/* Skeleton placeholder */}
            <div
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f0f0f0',
                animation: 'skeleton 1.5s infinite linear',
              }}
            />
            <h3 className="model-name">{model.name}</h3>
            <button onClick={() => openModal(model)}>View Details</button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .model-card {
          width: 200px;
          margin: 10px;
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
        }

        .model-name {
          font-size: 1.5rem;
          font-weight: bold;
          font-family: Arial, Helvetica, sans-serif;
          margin-bottom: 0.5rem;
        }

        @keyframes skeleton {
          0% {
            background-color: #f0f0f0;
          }
          50% {
            background-color: #ddd;
          }
          100% {
            background-color: #f0f0f0;
          }
        }
      `}</style>

      {isModalOpen && selectedModel && (
        <ModelDetailsModal model={selectedModel} onClose={closeModal} />
      )}

      <style jsx>{`
        @keyframes skeleton {
          0% {
            background-color: #f0f0f0;
          }
          50% {
            background-color: #ddd;
          }
          100% {
            background-color: #f0f0f0;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
