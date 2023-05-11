DROP PROCEDURE IF EXISTS resubmit_property;

DELIMITER //
CREATE PROCEDURE resubmit_property(IN p_property_id INT)
BEGIN
  DECLARE property_status ENUM('FORSALE', 'SOLD', 'WITHDRAWN');

  SELECT status INTO property_status
  FROM properties
  WHERE property_id = p_property_id;

  IF property_status = 'WITHDRAWN' THEN
    UPDATE properties
    SET status = 'FORSALE'
    WHERE property_id = p_property_id;
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot resubmit property. Property must be in "WITHDRAWN" status.';
  END IF;

END //
DELIMITER ;
