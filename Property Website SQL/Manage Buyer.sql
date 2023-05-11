DROP PROCEDURE IF EXISTS add_buyer;

DELIMITER //
CREATE PROCEDURE add_buyer(IN p_first_name VARCHAR(50), IN p_last_name VARCHAR(50), IN p_email VARCHAR(100), IN p_phone_number VARCHAR(20))
BEGIN
  DECLARE buyer_exists INT;

  SELECT COUNT(*) INTO buyer_exists
  FROM buyers
  WHERE first_name = p_first_name AND last_name = p_last_name AND email = p_email;

  IF buyer_exists = 0 THEN
    INSERT INTO buyers (first_name, last_name, email, phone_number)
    VALUES (p_first_name, p_last_name, p_email, p_phone_number);
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An account with this name and email address already exists.';
  END IF;

END //

DELIMITER ;
