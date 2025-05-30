import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RentalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicle = location.state?.vehicle;

  const [form, setForm] = React.useState({
    rentalDate: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const userId = Number(localStorage.getItem('userId'));
  console.log('RentalPage userId from localStorage:', userId);

  const handleSubmit = async () => {
    const data = {
  userId,
  vehicleId: vehicle.vehicle_id,
  rentalDate: form.rentalDate,
  startTime: form.startTime,
  endTime: form.endTime,
  totalPrice: vehicle.price_per_day
};


    try {
      const res = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        navigate('/payment', {
          state: {
            rentalId: result.rentalId,
            amount: vehicle.price_per_day,
            vehicleId: vehicle.vehicle_id
          }
        });
      } else {
        alert('Failed to save rental: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  if (!vehicle) return <p className="text-center py-10 text-[#5A827E] text-xl">No vehicle selected.</p>;

  return (
    <div className="min-h-screen bg-[#FAFFCA] py-12 px-4 md:px-10 flex justify-center">
      <div className="bg-white shadow-md border border-[#B9D4AA] rounded-2xl max-w-xl w-full p-8">
        <h2 className="text-3xl font-bold text-[#5A827E] mb-6">Rent: {vehicle.name}</h2>
        <img src={`/vehicle-images/${vehicle.image_url}`} alt={vehicle.name} className="rounded-xl mb-4 w-full h-64 object-cover" />
        <p className="text-lg font-semibold text-[#3F7C3E] mb-6">Price per Day: ₹{vehicle.pricePerDay}</p>

        <div className="space-y-4">
          <label className="block">
            <span className="text-[#5A827E] font-medium">Rental Date:</span>
            <input name="rentalDate" type="date" className="block w-full p-2 mt-1 border rounded-lg" onChange={handleChange} />
          </label>
          <label className="block">
            <span className="text-[#5A827E] font-medium">Start Time:</span>
            <input name="startTime" type="time" className="block w-full p-2 mt-1 border rounded-lg" onChange={handleChange} />
          </label>
          <label className="block">
            <span className="text-[#5A827E] font-medium">End Time:</span>
            <input name="endTime" type="time" className="block w-full p-2 mt-1 border rounded-lg" onChange={handleChange} />
          </label>

          <button onClick={handleSubmit} className="w-full bg-[#5A827E] text-white py-2 rounded-lg font-semibold hover:bg-[#84AE92] transition duration-300">
            Confirm Rental
          </button>
        </div>
      </div>
    </div>
  );
}

export default RentalPage;

