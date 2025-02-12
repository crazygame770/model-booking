import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface VillaDetailsModalProps {
  villa: { 
    id: number; 
    name: string; 
    imageUrls: string[];
    location: string;
    bedrooms: number;
    bathrooms: number;
    price: number;
    amenities: string[];
  };
  onClose: () => void;
}

const VillaDetailsModal: React.FC<VillaDetailsModalProps> = ({ villa, onClose }) => {
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
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          width: '800px',
          maxWidth: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{villa.name}</h2>
        
        {/* Image Slider */}
        <Slider {...settings}>
          {villa.imageUrls.map((_, index) => (
            <div key={index}>
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: '#f0f0f0',
                  animation: 'skeleton 1.5s infinite linear',
                }}
              />
            </div>
          ))}
        </Slider>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{villa.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p>${villa.price.toLocaleString()} per night</p>
            </div>
            <div>
              <h3 className="font-semibold">Bedrooms</h3>
              <p>{villa.bedrooms}</p>
            </div>
            <div>
              <h3 className="font-semibold">Bathrooms</h3>
              <p>{villa.bathrooms}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {villa.amenities.map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Book Now
          </button>
        </div>

        <style jsx>{`
          @keyframes skeleton {
            0% { background-color: #f0f0f0; }
            50% { background-color: #ddd; }
            100% { background-color: #f0f0f0; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VillaDetailsModal;
