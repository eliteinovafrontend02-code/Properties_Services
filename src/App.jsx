
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import Header from './components/common/Header';
import CustomerPortalPage from './components/customerportal/CustomerPortalPage';
import PostServicesPage from './components/postservices/PostServicesPage';
import OurServicesPage from './components/ourservices/OurServicesPage';

// Temporary page for /services/:category
const ServiceCategoryPlaceholder = () => {
  const { category } = useParams();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold capitalize text-gray-800">
        {category.replace(/-/g, " ")}
      </h2>
      <p className="text-gray-600 mt-2">
        All services page coming soon.
      </p>
    </div>
  );
};

// Temporary page for /post-services/:category
const PostServiceFormPlaceholder = () => {
  const { category } = useParams();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold capitalize text-gray-800">
        Post Your {category} Service
      </h2>
      <p className="text-gray-600 mt-2">
        Registration form coming soon.
      </p>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Fixed Header */}
      <Header />

      {/* Page Content - Space for Fixed Header */}
      <main className="pt-[85px] lg:pt-[120px]">

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

          {/* Post Your Services */}
          <Route
            path="/post-services"
            element={<PostServicesPage />}
          />

          {/* Our Services */}
          <Route
            path="/services"
            element={<OurServicesPage />}
          />

          {/* All Services of One Category */}
          <Route
            path="/services/:category"
            element={<ServiceCategoryPlaceholder />}
          />

          {/* Post a Specific Service Category */}
          <Route
            path="/post-services/:category"
            element={<PostServiceFormPlaceholder />}
          />

        </Routes>

      </main>
    </div>
  );
}

export default App;
