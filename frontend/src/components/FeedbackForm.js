import React, { useState } from 'react';

function FeedbackPage({ vehicleId }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleSubmit = async () => {
    const userId = Number(localStorage.getItem('userId')); // ✅ Get userId

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const feedbackData = {
      userId,
      vehicleId,
      rating,
      review
    };

    console.log('Sending feedback:', feedbackData); // Debug

    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Feedback submitted!');
      } else {
        alert('Failed to submit feedback: ' + result.error);
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Leave Feedback</h2>
      <div className="mb-4">
        <label className="block mb-1">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleSubmit} className="bg-[#5A827E] text-white px-4 py-2 rounded">
        Submit Feedback
      </button>
    </div>
  );
}

export default FeedbackPage;
