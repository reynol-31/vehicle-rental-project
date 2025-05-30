// src/pages/VehicleList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleRentClick = (vehicle) => {
    navigate('/rental', { state: { vehicle } });
  };

  useEffect(() => {
    document.title = 'Vehicle List | Urban Rides';
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFFCA] py-12 px-4 md:px-10">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-[#5A827E] tracking-tight">
        Explore Our Premium Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <p className="text-center text-[#5A827E] text-lg">No vehicles found.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {vehicles.map(vehicle => (
            <div
              key={vehicle.vehicle_id}
              className="bg-white rounded-2xl shadow-md border border-[#B9D4AA] hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={`/vehicle-images/${vehicle.image_url}`}
                  alt={vehicle.name}
                  className="h-56 w-full object-cover rounded-t-2xl"
                  onError={(e) => (e.target.src = '/placeholder-vehicle.jpg')}
                />
                <span className="absolute top-3 left-3 bg-[#5A827E] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {vehicle.type}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between bg-[#F8FBEF]">
                <div>
                  <h2 className="text-2xl font-semibold text-[#5A827E] mb-1">{vehicle.name}</h2>
                  <p className="text-[#84AE92] text-sm mb-4">Ideal for city rides</p>
                </div>
                <div>
                  <p className="text-[#3F7C3E] font-bold text-xl mb-4">₹{vehicle.price_per_day} / day</p>
                  <button
                    className="w-full bg-[#5A827E] text-white py-2 rounded-lg font-semibold hover:bg-[#84AE92] transition duration-300"
                    onClick={() => handleRentClick(vehicle)}
                  >
                    Rent This Vehicle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleList;
