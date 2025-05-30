const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change if your MySQL user is different
  password: 'root', // Add your MySQL password here if set
  database: 'vehicle_rental'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// POST: Customer sign-up
app.post('/api/customer-signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into the users table
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('MySQL Insert Error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.json({ message: 'User registered successfully', id: result.insertId });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// GET: List all vehicles
app.get('/api/vehicles', (req, res) => {
  const query = 'SELECT * FROM vehicles';
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST: Save customer login info
app.post('/api/customer-login', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND email = ?';
  db.query(query, [username, email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];
    console.log('User from DB:', user);
    console.log('user.user_id:', user.user_id);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      return res.json({ message: 'Login successful', userId: user.user_id });
    } catch (bcryptErr) {
      console.error('Bcrypt error:', bcryptErr);
      return res.status(500).json({ error: 'Server error' });
    }
  });
});

// POST: Save rental details with userId and fetch name from DB
app.post('/api/rentals', (req, res) => {
  const { userId, vehicleId, rentalDate, startTime, endTime, totalPrice } = req.body;
  console.log('Received rental data:', { userId, vehicleId, rentalDate, startTime, endTime, totalPrice });


  // Optional: check if user or vehicle exists before inserting (safety check)
  const userQuery = 'SELECT username FROM users WHERE user_id = ?';
  db.query(userQuery, [userId], (err, userResult) => {
    if (err) {
      console.error('User lookup error:', err);
      return res.status(500).json({ error: 'Database error during user lookup' });
    }
     console.log('User lookup result:', userResult);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const insertQuery = `
      INSERT INTO rental_details 
      (user_id, vehicle_id, rental_date, start_time, end_time, total_price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [userId, vehicleId, rentalDate, startTime, endTime, totalPrice],
      (err, result) => {
        if (err) {
          console.error('Error inserting rental details:', err);
          return res.status(500).json({ error: 'Failed to save rental details' });
        }
        res.json({ message: 'Rental saved', rentalId: result.insertId });
      }
    );
  });
});



// POST: Save payment details
app.post('/api/payments', (req, res) => {
  const { rentalId, paymentMethod, cardNumber, cardholderName, expiryDate, cvv, amount } = req.body;

  const query = `
    INSERT INTO payments (rental_id, payment_method, card_number, cardholder_name, expiry_date, cvv, amount)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [rentalId, paymentMethod, cardNumber, cardholderName, expiryDate, cvv, amount], (err, result) => {
    if (err) {
      console.error('Payment save error:', err);
      return res.status(500).json({ error: 'Failed to save payment' });
    }
    res.json({ message: 'Payment saved', paymentId: result.insertId });
  });
});

// POST: Save feedback
app.post('/api/feedback', (req, res) => {
  const { vehicleId, rating, review } = req.body;
  const query = 'INSERT INTO feedback (vehicle_id, rating, review) VALUES (?, ?, ?)';
  db.query(query, [vehicleId, rating, review], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Feedback saved', id: result.insertId });
  });
});

// Start server
app.listen(5000, () => {
  console.log('Backend server running at http://localhost:5000');
});