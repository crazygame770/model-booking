'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to ModelBooking Miami</h1>
      
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
        Your gateway to the Miami modeling industry. We connect talented models with top agencies and clients in the Miami area.
      </p>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          Are you a model looking to expand your career in Miami?
        </p>
        
        <Link 
          href="/model/register" 
          className="inline-block bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-colors"
        >
          Register as a Model
        </Link>
      </div>
    </main>
  );
}
