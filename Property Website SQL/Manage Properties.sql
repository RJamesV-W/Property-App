DROP PROCEDURE IF EXISTS add_property;

DELIMITER //
CREATE PROCEDURE add_property(
  IN p_address VARCHAR(255),
  IN p_postcode VARCHAR(9),
  IN p_num_bedrooms INT,
  IN p_num_bathrooms INT,
  IN p_has_garden BOOLEAN,
  IN p_property_type ENUM('APARTMENT', 'DETACHED', 'SEMI_DETACHED', 'TERRACED', 'BUNGALOW', 'COTTAGE'),
  IN p_price DECIMAL(10, 2),
  IN p_seller_id INT
)
BEGIN
  DECLARE address_exists INT;

  SELECT COUNT(*) INTO address_exists
  FROM properties
  WHERE address = p_address AND postcode = p_postcode;

  IF address_exists = 0 THEN
    INSERT INTO properties (address, postcode, num_bedrooms, num_bathrooms, has_garden, property_type, price, seller_id)
    VALUES (p_address, p_postcode, p_num_bedrooms, p_num_bathrooms, p_has_garden, p_property_type, p_price, p_seller_id);
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The property with this address already exists.';
  END IF;

END //
DELIMITER ;
