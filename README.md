# 🚗 Vehicle Rental System

A full-stack web application for renting vehicles, featuring customer login/signup, vehicle listings, rental booking, payments, feedback, and an admin dashboard. Built with React, Node.js/Express, and MySQL.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Security:** bcrypt (for password hashing)
- **Deployment:** Runs locally (can be extended for cloud deployment)

---

## 📂 Project Structure

```
vehicle-rental/
├── backend/                # Node.js + Express server
│   ├── server.js           # Main Express app
│   └── ...                 # All API routes
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # React components (AdminDashboard, etc.)
│   │   └── App.js          # React routes
│   └── public/
│       ├── index.html
│       └── favicon.ico
└── README.md               # Project documentation
```

---

## ⚙️ Features

### 👤 Customer Features
- Sign Up / Login (with hashed password)
- Browse available vehicles
- Book a rental with time, date, and vehicle
- Make payments (mock input)
- Leave feedback with rating and review

### 🛠️ Admin Features
- Hardcoded login (`admin` / `admin`)
- Admin Dashboard with tables for:
  - Vehicles
  - Users
  - Rentals
  - Payments
  - Feedback

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/vehicle-rental.git
cd vehicle-rental
```

### 2. Setup MySQL Database

- Create a database:
```sql
CREATE DATABASE vehicle_rental;
```
- Import the tables using your SQL dump or manually create:
```sql
-- Example for users
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
-- Similarly create vehicles, rental_details, payments, feedback...
```

### 3. Configure backend

Navigate to backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Edit DB credentials in `server.js`:
```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'vehicle_rental'
});
```

Start the backend server:
```bash
node server.js
```
Backend will run on: `http://localhost:5000`

---

### 4. Start frontend

Navigate to frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start React app:
```bash
npm start
```
Frontend runs on: `http://localhost:3000`

---

## 🧪 API Endpoints (REST)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/customer-signup  | Register new user        |
| POST   | /api/customer-login   | Login existing user      |
| POST   | /api/rentals          | Book rental              |
| POST   | /api/payments         | Submit payment           |
| POST   | /api/feedback         | Submit feedback          |
| GET    | /api/admin/vehicles   | Get all vehicles         |
| GET    | /api/admin/users      | Get all users            |
| GET    | /api/admin/payments   | Get all payments         |
| GET    | /api/admin/feedback   | Get all feedback         |
| GET    | /api/admin/rentals    | Get all rental records   |
| POST   | /api/admin-login      | Admin login (hardcoded)  |

---

## 🔐 Admin Credentials

| Username | Password |
|----------|----------|
| admin    | admin    |

---

## 🎨 UI Theme

Color Palette used:
- `#5A827E` (Dark Teal)
- `#84AE92` (Sage Green)
- `#B9D4AA` (Light Olive)
- `#FAFFCA` (Cream)


---

## 📬 Feedback & Contributions

Open issues or pull requests are welcome. Feel free to fork and customize this project for your own use.

---

## 📄 License

This project is open source and free to use.