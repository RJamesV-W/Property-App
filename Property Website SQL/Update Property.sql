DROP PROCEDURE IF EXISTS update_property;

DELIMITER //
CREATE PROCEDURE update_property(
  IN p_property_id INT,
  IN p_address VARCHAR(255),
  IN p_postcode VARCHAR(9),
  IN p_num_bedrooms INT,
  IN p_num_bathrooms INT,
  IN p_has_garden BOOLEAN,
  IN p_property_type ENUM('APARTMENT', 'DETACHED', 'SEMI_DETACHED', 'TERRACED', 'BUNGALOW', 'COTTAGE'),
  IN p_price DECIMAL(10, 2)
)
BEGIN
  UPDATE properties
  SET
    address = COALESCE(p_address, address),
    postcode = COALESCE(p_postcode, postcode),
    num_bedrooms = COALESCE(p_num_bedrooms, num_bedrooms),
    num_bathrooms = COALESCE(p_num_bathrooms, num_bathrooms),
    has_garden = COALESCE(p_has_garden, has_garden),
    property_type = COALESCE(p_property_type, property_type),
    price = COALESCE(p_price, price)
  WHERE property_id = p_property_id;

END //
DELIMITER ;