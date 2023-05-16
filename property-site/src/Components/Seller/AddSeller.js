import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import "./SellerPage.css"

let jsonURL = "http://localhost:8080";

function AddSeller({ onAddSeller }) {
  const navigate = useNavigate();
  const [newSeller, setNewSeller] = useState({
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
    setNewSeller({ ...newSeller, [name]: value });
  };

	const validateForm = () => {
    const messages = {};

    Object.keys(newSeller).forEach((key) => {
      if (!newSeller[key]) {
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
	
		fetch(`${jsonURL}/seller/add`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSeller),
		})
			.then((response) => response.json())
			.then((data) => onAddSeller(data))
			.catch((error) => console.error(error));
	
		setNewSeller({ firstName: '', surname: '', email: '', address: '', postcode: '', phone: '' });
	
		navigate('/seller');
	};

  const handleCancel = () => {
    setNewSeller({
      firstName: '',
      surname: '',
      email: '',
      address: '',
      postcode: '',
      phone: '',
    });

    navigate('/seller');
  };

  return (
    <div>
      <h1>Add Seller</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Seller</h2>
        <label>First Name:</label>
        <input type="text" name="firstName" className='submitText' value={newSeller.firstName} onChange={handleChange} required /><br/>
				{validationMessages.firstName && <p className="validation-message">{validationMessages.firstName}</p>}<br/>

        <label>Surname:</label>
        <input type="text" name="surname" className='submitText' value={newSeller.surname} onChange={handleChange} required /><br/>
				{validationMessages.surname && <p className="validation-message">{validationMessages.surname}</p>}<br/>

        <label>Email:</label>
        <input type="email" name="email" className='submitText' value={newSeller.email} onChange={handleChange} required /><br/>
				{validationMessages.address && <p className="validation-message">{validationMessages.address}</p>}<br/>

        <label>Address:</label>
        <input type="text" name="address" className='submitText' value={newSeller.address} onChange={handleChange} required /><br/>
				{validationMessages.address && <p className="validation-message">{validationMessages.address}</p>}<br/>

        <label>Postcode:</label>
        <input type="text" name="postcode" className='submitText' value={newSeller.postcode} onChange={handleChange} required /><br/>
				{validationMessages.postcode && <p className="validation-message">{validationMessages.postcode}</p>}<br/>

        <label>Phone:</label>
        <input type="text" name="phone" className='submitText' value={newSeller.phone} onChange={handleChange} required /><br/>
				{validationMessages.phone && <p className="validation-message">{validationMessages.phone}</p>}<br/>

        <button type="submit" className="submit-button">Add Seller</button>
        <button type="button" className="submit-button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddSeller;
