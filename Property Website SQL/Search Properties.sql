DROP PROCEDURE IF EXISTS search_properties;

DELIMITER //
CREATE PROCEDURE search_properties(
  IN p_address VARCHAR(255) DEFAULT NULL,
  IN p_postcode VARCHAR(9) DEFAULT NULL,
  IN p_property_type ENUM('APARTMENT', 'DETACHED', 'SEMI_DETACHED', 'TERRACED', 'BUNGALOW', 'COTTAGE', 'TOWNHOUSE') DEFAULT NULL,
  IN p_min_price DECIMAL(10, 2) DEFAULT NULL,
  IN p_max_price DECIMAL(10, 2) DEFAULT NULL,
  IN p_min_bedrooms INT DEFAULT NULL,
  IN p_min_bathrooms INT DEFAULT NULL
)
BEGIN
  SELECT *
  FROM properties
  WHERE (p_address IS NULL OR address LIKE CONCAT('%', p_address, '%'))
    AND (p_postcode IS NULL OR postcode LIKE CONCAT('%', p_postcode, '%'))
    AND (p_property_type IS NULL OR property_type = p_property_type)
    AND (p_min_price IS NULL OR price >= p_min_price)
    AND (p_max_price IS NULL OR price <= p_max_price)
    AND (p_min_bedrooms IS NULL OR num_bedrooms >= p_min_bedrooms)
    AND (p_min_bathrooms IS NULL OR num_bathrooms >= p_min_bathrooms)
    AND status = 'FORSALE';
END //
DELIMITER ;
