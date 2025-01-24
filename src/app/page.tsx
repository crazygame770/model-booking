'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    models: '',
    hours: '',
    eventPublic: '',
    eventDescription: '',
    date: '',
    cityArea: '',
    schedule: '',
    details: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can add API call logic here
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">BOOKING</h1>
      
      <p className="text-center mb-8 text-gray-700">
        To booking or request a quote for our atmosphere models services in Miami, Las Vegas o New York, please fill out the following form and we will send a budget right now.
      </p>
      
      <p className="text-center mb-8 text-gray-600">
        We are available to answer your questions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="Company"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
        />
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        
        <input
          type="tel"
          placeholder="Phone"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="How many models do you need?"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.models}
          onChange={(e) => setFormData({...formData, models: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="How many hours?"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.hours}
          onChange={(e) => setFormData({...formData, hours: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="Event Public or Private?"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.eventPublic}
          onChange={(e) => setFormData({...formData, eventPublic: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="Event or Party description"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.eventDescription}
          onChange={(e) => setFormData({...formData, eventDescription: e.target.value})}
        />
        
        <input
          type="date"
          placeholder="Date"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="City/Area"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.cityArea}
          onChange={(e) => setFormData({...formData, cityArea: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="Schedule"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.schedule}
          onChange={(e) => setFormData({...formData, schedule: e.target.value})}
        />
        
        <textarea
          placeholder="Please provide more details"
          className="w-full p-2 border border-gray-300 rounded h-32"
          value={formData.details}
          onChange={(e) => setFormData({...formData, details: e.target.value})}
        />
        
        <button
          type="submit"
          className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors"
        >
          SEND MESSAGE
        </button>
      </form>
      
      <div className="text-center mt-8 text-gray-700">
        MIAMI
      </div>
    </main>
  );
}
