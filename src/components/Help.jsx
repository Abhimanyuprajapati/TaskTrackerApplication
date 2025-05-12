import React from 'react';
import { Mail, Phone, BookOpen, AlertCircle } from 'lucide-react';

export const Help = () => {
  return (
    <div className="p-4  overflow-auto mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h1>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Support */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center mb-3">
            <Mail className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Contact Support</h2>
          </div>
          <p className="text-gray-600 mb-2">Need assistance? Our team is here to help.</p>
          <p className="text-gray-700 mb-1">
            📧 Email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a>
          </p>
          <p className="text-gray-700">
            ☎️ Phone: <span className="text-blue-500">+1 800-123-4567</span>
          </p>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center mb-3">
            <BookOpen className="text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">FAQs</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>How to reset my password?</li>
            <li>Where can I view my project details?</li>
            <li>How to contact support?</li>
            <li>What to do if I can't log in?</li>
          </ul>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center mb-3">
            <AlertCircle className="text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Troubleshooting</h2>
          </div>
          <p className="text-gray-700">Having technical issues?</p>
          <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
            <li>Clear browser cache and cookies</li>
            <li>Check your internet connection</li>
            <li>Try logging out and back in</li>
            <li>Use updated version of browser</li>
          </ul>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center mb-3">
            <Phone className="text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">Give Feedback</h2>
          </div>
          <p className="text-gray-700 mb-3">We value your feedback to improve our service.</p>
          <form className="space-y-3">
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your feedback..."
              rows="4"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
