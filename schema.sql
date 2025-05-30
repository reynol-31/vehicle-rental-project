-- Drop and recreate the database
DROP DATABASE IF EXISTS vehicle_rental;
CREATE DATABASE vehicle_rental
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE vehicle_rental;

-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Matches the backend hashed password field
    full_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
) ENGINE=InnoDB;

-- Vehicles Table
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('Sedan', 'SUV', 'Scooter', 'Car', 'Motorbike') NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL CHECK (price_per_day >= 0),
    image_url VARCHAR(255) DEFAULT '',
    status ENUM('Available', 'Rented', 'Maintenance') DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_vehicle_type (type)
) ENGINE=InnoDB;


-- Insert Initial Vehicle Data
INSERT INTO vehicles (name, type, price_per_day, image_url) VALUES
('Honda City', 'Sedan', 2500.00, '/images/honda-city.jpg'),
('Toyota Innova', 'SUV', 3000.00, '/images/toyota-innova.jpg'),
('Honda Activa', 'Scooter', 300.00, 'https://cdn.pixabay.com/photo/2016/11/29/10/07/motor-scooter-1868943_1280.jpg'),
('Maruti Swift', 'Car', 1200.00, 'https://cdn.pixabay.com/photo/2020/10/27/12/28/car-5691079_1280.jpg'),
('Royal Enfield', 'Motorbike', 800.00, 'https://cdn.pixabay.com/photo/2022/05/15/18/30/motorbike-7197624_1280.jpg');

-- Customer Login Tracking
CREATE TABLE customer_login (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- Rental Details
CREATE TABLE rental_details (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    rental_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    status ENUM('Pending', 'Active', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    INDEX idx_rental_date (rental_date)
) ENGINE=InnoDB;

-- Payments
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT NOT NULL,
    payment_method ENUM('Credit Card', 'Debit Card', 'UPI', 'Cash') NOT NULL,
    card_number VARCHAR(20),
    cardholder_name VARCHAR(100),
    expiry_date VARCHAR(10),
    cvv VARCHAR(10),
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    payment_status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rental_id) REFERENCES rental_details(rental_id),
    INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB;

-- Feedback Table
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    INDEX idx_vehicle_rating (vehicle_id, rating)
) ENGINE=InnoDB;

select *from vehicles;
