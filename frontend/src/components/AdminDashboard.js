import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetchData('admin/vehicles', setVehicles);
    fetchData('admin/users', setUsers);
    fetchData('admin/payments', setPayments);
    fetchData('admin/feedback', setFeedbacks);
    fetchData('admin/rentals', setRentals);
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`);
      const data = await res.json();
      setState(data);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err);
    }
  };

  const renderTable = (title, data) => (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-[#5A827E] mb-4">{title}</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#84AE92] text-white">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left font-medium">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {Object.values(item).map((value, i) => (
                  <td key={i} className="px-4 py-2 whitespace-nowrap">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2F4F3] p-6">
      <header className="bg-white shadow mb-8 p-4 rounded-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#5A827E]">Admin Dashboard</h1>
        <span className="text-sm text-gray-600">Welcome, admin</span>
      </header>

      {renderTable('Vehicles', vehicles)}
      {renderTable('Users', users)}
      {renderTable('Payments', payments)}
      {renderTable('Feedback', feedbacks)}
      {renderTable('Rental Details', rentals)}
    </div>
  );
}

export default AdminDashboard;
