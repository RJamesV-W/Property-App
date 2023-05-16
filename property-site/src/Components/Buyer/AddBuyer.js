import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./BuyerPage.css"

let jsonURL = "http://localhost:8080";

function AddBuyer({ onAddBuyer }) {
  const navigate = useNavigate();
  const [newBuyer, setNewBuyer] = useState({
    firstName: '',
    surname: '',
    email: '',
    address: '',
    postcode: '',
    phone: '',
  });
	const [validationMessages, setValidationMessages] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBuyer({ ...newBuyer, [name]: value });
  };

	const validateForm = () => {
    const messages = {};

    Object.keys(newBuyer).forEach((key) => {
      if (!newBuyer[key]) {
        messages[key] = 'This field is required';
      }
    });

    setValidationMessages(messages);

    return Object.keys(messages).length === 0;
  };

	const handleSubmit = (event) => {
		event.preventDefault();
	
		if (!validateForm()) {
			return;
		}
	
		fetch(`${jsonURL}/buyer/add`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newBuyer),
		})
		.then((response) => response.json())
		.then((data) => {
      setNewBuyer({ firstName: '', surname: '', email: '', address: '', postcode: '', phone: '' });
      navigate('/buyer');
    })
		.catch((error) => console.error(error));
	
	};

  const handleCancel = () => {
    setNewBuyer({
      firstName: '',
      surname: '',
      email: '',
      address: '',
      postcode: '',
      phone: '',
    });

    navigate('/buyer');
  };

  return (
    <div>
      <h1>Add Buyer</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Buyer</h2>
        <label>First Name:</label>
        <input type="text" name="firstName" className='submitText' value={newBuyer.firstName} onChange={handleChange} required /><br/>
				{validationMessages.firstName && <p className="validation-message">{validationMessages.firstName}</p>}<br/>

        <label>Surname:</label>
        <input type="text" name="surname" className='submitText' value={newBuyer.surname} onChange={handleChange} required /><br/>
				{validationMessages.surname && <p className="validation-message">{validationMessages.surname}</p>}<br/>

        <label>Email:</label>
        <input type="email" name="email" className='submitText' value={newBuyer.email} onChange={handleChange} required /><br/>
				{validationMessages.email && <p className="validation-message">{validationMessages.email}</p>}<br/>

        <label>Address:</label>
        <input type="text" name="address" className='submitText' value={newBuyer.address} onChange={handleChange} required /><br/>
				{validationMessages.address && <p className="validation-message">{validationMessages.address}</p>}<br/>

        <label>Postcode:</label>
        <input type="text" name="postcode" className='submitText' value={newBuyer.postcode} onChange={handleChange} required /><br/>
				{validationMessages.postcode && <p className="validation-message">{validationMessages.postcode}</p>}<br/>

        <label>Phone:</label>
        <input type="text" name="phone" className='submitText' value={newBuyer.phone} onChange={handleChange} required /><br/>
				{validationMessages.phone && <p className="validation-message">{validationMessages.phone}</p>}<br/>

        <button type="submit" className="submit-button">Add Buyer</button>
        <button type="button" className="submit-button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddBuyer;
