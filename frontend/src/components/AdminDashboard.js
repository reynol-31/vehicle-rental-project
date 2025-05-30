import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [data, setData] = useState({ vehicles: [], users: [], payments: [], feedback: [], rentals: [] });

  const fetchTable = async (table) => {
    const res = await fetch(`http://localhost:5000/api/admin/${table}`);
    const result = await res.json();
    setData(prev => ({ ...prev, [table]: result }));
  };

  useEffect(() => {
    ['vehicles', 'users', 'payments', 'feedback', 'rentals'].forEach(fetchTable);
  }, []);

  const renderTable = (title, items) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <pre className="bg-gray-100 p-3 overflow-auto rounded max-h-60">{JSON.stringify(items, null, 2)}</pre>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {renderTable('Vehicles', data.vehicles)}
      {renderTable('Users', data.users)}
      {renderTable('Payments', data.payments)}
      {renderTable('Feedback', data.feedback)}
      {renderTable('Rentals', data.rentals)}
    </div>
  );
}

export default AdminDashboard;
