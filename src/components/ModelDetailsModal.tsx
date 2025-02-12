import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ModelDetailsModalProps {
  model: { id: number; name: string; imageUrls: string[] };
  onClose: () => void;
}

const ModelDetailsModal: React.FC<ModelDetailsModalProps> = ({ model, onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          width: '500px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          fontFamily: 'Arial, Helvetica, sans-serif',
          marginBottom: '0.5rem'
        }}>{model.name}</h2>
        {/* Image Slider */}
        <Slider {...settings}>
          {model.imageUrls.map((_, index) => (
            <div key={index}>
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundColor: '#f0f0f0',
                  animation: 'skeleton 1.5s infinite linear',
                }}
              />
            </div>
          ))}
        </Slider>
        <p className="model-details">Model details go here...</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button>Book</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>

      <style jsx>{`
        .model-details {
          font-size: 1rem;
          font-family: Arial, Helvetica, sans-serif;
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
    </div>
  );
};

export default ModelDetailsModal;
