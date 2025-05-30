show tables;
desc users;
DESCRIBE payments;

SELECT *FROM users;
SELECT *FROM rental_details;
SELECT *FROM feedback;
DESCRIBE feedback;
SELECT * FROM customer_login;
SELECT * FROM users WHERE username = 'cse' AND email = 'dreynol31@gmail.com';
SELECT username, email, password FROM users;
SELECT *from vehicles;
UPDATE vehicles
SET image_url = 'classic.webp'
WHERE vehicle_id = 5;
 UPDATE vehicles set name='Royal Enfield Classic 350' WHERE vehicle_id=5; 

SHOW COLUMNS FROM payments LIKE 'payment_method';
ALTER TABLE payments 
MODIFY payment_method ENUM('Cash', 'UPI', 'Card');
