DROP PROCEDURE IF EXISTS withdraw_property;

DELIMITER //
CREATE PROCEDURE withdraw_property(IN p_property_id INT)
BEGIN
  DECLARE property_status ENUM('FORSALE', 'SOLD', 'WITHDRAWN');

  SELECT status INTO property_status
  FROM properties
  WHERE property_id = p_property_id;

  IF property_status = 'SOLD' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '406 Not Acceptable, Cannot withdraw a sold property';
  ELSEIF property_status = 'FORSALE' THEN
    UPDATE properties
    SET status = 'WITHDRAWN'
    WHERE property_id = p_property_id;
  END IF;

END //
DELIMITER ;
