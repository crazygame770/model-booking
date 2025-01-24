'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    weight: '',
    experience: '',
    instagram: '',
    portfolio: '',
    availability: '',
    location: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can add API call logic here
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">MODEL REGISTRATION</h1>
      
      <p className="text-center mb-8 text-gray-700">
        Join our modeling agency by filling out the registration form below. We're always looking for new talent in Miami, Las Vegas, and New York.
      </p>
      
      <p className="text-center mb-8 text-gray-600">
        We will review your application and contact you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border border-gray-300 rounded"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required
          />
          
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border border-gray-300 rounded"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Age"
            className="p-2 border border-gray-300 rounded"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            required
          />
          
          <input
            type="text"
            placeholder="Height (cm)"
            className="p-2 border border-gray-300 rounded"
            value={formData.height}
            onChange={(e) => setFormData({...formData, height: e.target.value})}
            required
          />
          
          <input
            type="text"
            placeholder="Weight (kg)"
            className="p-2 border border-gray-300 rounded"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            required
          />
        </div>

        <textarea
          placeholder="Modeling Experience"
          className="w-full p-2 border border-gray-300 rounded h-24"
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
        />

        <input
          type="text"
          placeholder="Instagram Handle"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.instagram}
          onChange={(e) => setFormData({...formData, instagram: e.target.value})}
        />

        <input
          type="url"
          placeholder="Portfolio URL (if any)"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.portfolio}
          onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
        />

        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.availability}
          onChange={(e) => setFormData({...formData, availability: e.target.value})}
          required
        >
          <option value="">Select Availability</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="weekends">Weekends Only</option>
        </select>

        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        >
          <option value="">Select Preferred Location</option>
          <option value="miami">Miami</option>
          <option value="las-vegas">Las Vegas</option>
          <option value="new-york">New York</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
}
