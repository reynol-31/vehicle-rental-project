import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';

function PaymentPage() {
  const location = useLocation();
  const { rentalId, amount, vehicleId } = location.state || {};

  const [form, setForm] = useState({
    paymentMethod: 'Card',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentalId,
          amount,
          ...form
        })
      });

      const result = await res.json();
      if (res.ok) {
        alert('Payment successful! ID: ' + result.paymentId);
        setPaymentSuccess(true);
      } else {
        alert('Payment failed: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error processing payment.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFFCA] py-12 px-4 md:px-10 flex justify-center">
      <div className="bg-white shadow-md border border-[#B9D4AA] rounded-2xl max-w-xl w-full p-8">
        <h2 className="text-3xl font-bold text-[#5A827E] mb-6">Payment</h2>
        <p className="text-lg font-semibold text-[#3F7C3E] mb-6">Amount: ₹{amount}</p>

        {!paymentSuccess && (
          <div className="space-y-4">
            <select name="paymentMethod" onChange={handleChange} className="block w-full p-2 border rounded-lg">
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
            <input name="cardholderName" placeholder="Cardholder Name" onChange={handleChange} className="block w-full p-2 border rounded-lg" />
            <input name="cardNumber" placeholder="Card Number" onChange={handleChange} className="block w-full p-2 border rounded-lg" />
            <input name="expiryDate" placeholder="MM/YY" onChange={handleChange} className="block w-full p-2 border rounded-lg" />
            <input name="cvv" placeholder="CVV" onChange={handleChange} className="block w-full p-2 border rounded-lg" />
            <button onClick={handleSubmit} className="w-full bg-[#5A827E] text-white py-2 rounded-lg font-semibold hover:bg-[#84AE92] transition duration-300">
              Pay Now
            </button>
          </div>
        )}

        {paymentSuccess && <FeedbackForm rentalId={rentalId} vehicleId={vehicleId} />}
      </div>
    </div>
  );
}

export default PaymentPage;