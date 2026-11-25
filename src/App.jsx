
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import CustomerPortalPage from './components/customerportal/CustomerPortalPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header />

      {/* Page Routes */}
      <main>
        <Routes>

          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome to Eliteinova Properties
                </h2>

                <p className="text-gray-600 mt-2">
                  This is the main content area of the application.
                </p>
              </div>
            }
          />

          {/* Customer Portal */}
          <Route
            path="/customer-portal"
            element={<CustomerPortalPage />}
          />

        </Routes>
      </main>

    </div>
  );
}

export default App;
