import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        to="/admin/users"
        className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Manage Users</h2>
        <p className="text-gray-600">View, add, edit, or delete users in the system.</p>
      </Link>

      <Link
        to="/admin/assessments"
        className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-green-600 mb-2">Manage Assessments</h2>
        <p className="text-gray-600">Create, assign, and review user assessments.</p>
      </Link>
    </div>
  </div>
);

export default Dashboard;
