'use client';

import { useState, FormEvent } from 'react';

interface FormErrors {
  [key: string]: string;
}

export default function ModelRegister() {
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
    availability: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Age validation
    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 18 || age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    // Height validation
    const height = parseFloat(formData.height);
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (isNaN(height) || height < 140 || height > 220) {
      newErrors.height = 'Height must be between 140 and 220 cm';
    }

    // Weight validation
    const weight = parseFloat(formData.weight);
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(weight) || weight < 40 || weight > 150) {
      newErrors.weight = 'Weight must be between 40 and 150 kg';
    }

    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = 'Please describe your modeling experience';
    }

    // Instagram validation (optional but must be valid if provided)
    if (formData.instagram) {
      const instagramRegex = /^@?[a-zA-Z0-9._]+$/;
      if (!instagramRegex.test(formData.instagram)) {
        newErrors.instagram = 'Please enter a valid Instagram handle';
      }
    }

    // Portfolio URL validation (optional but must be valid if provided)
    if (formData.portfolio) {
      try {
        new URL(formData.portfolio);
      } catch {
        newErrors.portfolio = 'Please enter a valid URL';
      }
    }

    // Availability validation
    if (!formData.availability) {
      newErrors.availability = 'Please select your availability';
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Handle form submission here
        console.log('Form submitted successfully:', formData);
        // You can add API call logic here
        
        // Reset form after successful submission
        setFormData({
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
          availability: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log('Form validation failed');
    }
    
    setIsSubmitting(false);
  };

  const renderError = (field: string) => {
    return errors[field] ? (
      <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
    ) : null;
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">MODEL REGISTRATION - MIAMI</h1>
      
      <p className="text-center mb-8 text-gray-700">
        Join our modeling agency in Miami by filling out the registration form below. We're always looking for new talent in the Miami area.
      </p>
      
      <p className="text-center mb-8 text-gray-600">
        We will review your application and contact you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              className={`p-2 border rounded w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
            {renderError('firstName')}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Last Name"
              className={`p-2 border rounded w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
            {renderError('lastName')}
          </div>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {renderError('email')}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          {renderError('phone')}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              placeholder="Age"
              className={`w-full p-2 border rounded ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
            />
            {renderError('age')}
          </div>

          <div>
            <input
              type="number"
              placeholder="Height (cm)"
              className={`w-full p-2 border rounded ${errors.height ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.height}
              onChange={(e) => setFormData({...formData, height: e.target.value})}
            />
            {renderError('height')}
          </div>

          <div>
            <input
              type="number"
              placeholder="Weight (kg)"
              className={`w-full p-2 border rounded ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
            {renderError('weight')}
          </div>
        </div>

        <div>
          <textarea
            placeholder="Modeling Experience"
            className={`w-full p-2 border rounded ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            rows={4}
          />
          {renderError('experience')}
        </div>

        <div>
          <input
            type="text"
            placeholder="Instagram Handle (optional)"
            className={`w-full p-2 border rounded ${errors.instagram ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.instagram}
            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
          />
          {renderError('instagram')}
        </div>

        <div>
          <input
            type="url"
            placeholder="Portfolio URL (optional)"
            className={`w-full p-2 border rounded ${errors.portfolio ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.portfolio}
            onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
          />
          {renderError('portfolio')}
        </div>

        <div>
          <select
            className={`w-full p-2 border rounded ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.availability}
            onChange={(e) => setFormData({...formData, availability: e.target.value})}
          >
            <option value="">Select Availability</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="weekends">Weekends Only</option>
            <option value="flexible">Flexible</option>
          </select>
          {renderError('availability')}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </main>
  );
}
