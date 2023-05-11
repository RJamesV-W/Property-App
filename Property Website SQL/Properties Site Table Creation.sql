-- Create database
DROP DATABASE IF EXISTS property_website;
CREATE DATABASE IF NOT EXISTS property_website;
USE property_website;

-- Sellers Table
CREATE TABLE IF NOT EXISTS sellers (
  seller_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone_number VARCHAR(20)
);

-- Buyers Table
CREATE TABLE IF NOT EXISTS buyers (
  buyer_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone_number VARCHAR(20)
);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  property_id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(255),
  postcode VARCHAR(9),
  num_bedrooms INT,
  num_bathrooms INT,
  has_garden BOOLEAN,
  property_type ENUM('APARTMENT', 'DETACHED', 'SEMI_DETACHED', 'TERRACED', 'BUNGALOW', 'COTTAGE'),
  price DECIMAL(10, 2),
  status ENUM('FORSALE', 'SOLD', 'WITHDRAWN') DEFAULT 'FORSALE',
  seller_id INT,
  FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);

-- Agents Table
CREATE TABLE IF NOT EXISTS agents (
  agent_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone_number VARCHAR(20)
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  buyer_id INT,
  start_date DATETIME,
  end_date DATETIME,
  agent_id INT,
  FOREIGN KEY (property_id) REFERENCES properties(property_id),
  FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id),
  FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);

