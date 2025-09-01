"use client";
import React, { useState } from 'react';

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubscribe() {
    setLoading(true);
    setError('');
    try {
      // Call backend to initiate Chapa payment
      const res = await fetch('/api/billing/subscribe', { method: 'POST' });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || 'Failed to initiate payment.');
      }
    } catch {
      setError('Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Upgrade to Pro</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Unlock unlimited access to all features for just $9.99/month.
        </p>
        <button
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Subscribe with Chapa'}
        </button>
        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}