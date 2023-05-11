DROP PROCEDURE IF EXISTS create_booking;

DELIMITER //
CREATE PROCEDURE create_booking (
  IN p_property_id INT,
  IN p_buyer_id INT,
  IN p_start_date DATETIME,
  IN p_end_date DATETIME,
  IN p_agent_id INT
)
BEGIN
  DECLARE property_sold, agent_busy, property_booked INT;

  SELECT COUNT(*)
  INTO property_sold
  FROM properties
  WHERE property_id = p_property_id AND status = 'SOLD';

  IF property_sold > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The property is already sold.';
  ELSE
    SELECT COUNT(*)
    INTO agent_busy
    FROM bookings
    WHERE agent_id = p_agent_id AND (
      (start_date <= p_start_date AND end_date >= p_start_date) OR
      (start_date <= p_end_date AND end_date >= p_end_date) OR
      (start_date >= p_start_date AND end_date <= p_end_date)
    );

    IF agent_busy > 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The agent is not available during this time.';
    ELSE
      SELECT COUNT(*)
      INTO property_booked
      FROM bookings
      WHERE property_id = p_property_id AND (
        (start_date <= p_start_date AND end_date >= p_start_date) OR
        (start_date <= p_end_date AND end_date >= p_end_date) OR
        (start_date >= p_start_date AND end_date <= p_end_date)
      );

      IF property_booked > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The property is already booked during this time.';
      ELSE
        INSERT INTO bookings (property_id, buyer_id, start_date, end_date, agent_id)
        VALUES (p_property_id, p_buyer_id, p_start_date, p_end_date, p_agent_id);
      END IF;
    END IF;
  END IF;

END //
DELIMITER ;
