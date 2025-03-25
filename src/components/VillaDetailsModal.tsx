import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Villa } from '@/data/villas';

interface VillaDetailsModalProps {
  villa: Villa;
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
          {villa.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`${villa.name} - View ${index + 1}`}
                className="w-full h-[400px] object-cover"
              />
            </div>
          ))}
        </Slider>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>
                {villa.isWaterfront && <span className="text-blue-500">Waterfront - </span>}
                {villa.location}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p>${villa.price?.toLocaleString()} per night + {villa.tax}% tax</p>
            </div>
            <div>
              <h3 className="font-semibold">Minimum Stay</h3>
              <p>{villa.minStayWeeks} week minimum</p>
            </div>
            <div>
              <h3 className="font-semibold">Additional Fees</h3>
              <p>${villa.exitCleaningFee?.toLocaleString()} exit cleaning</p>
              <p>${villa.securityDeposit?.toLocaleString()} security deposit</p>
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
      </div>
    </div>
  );
};

export default VillaDetailsModal;
