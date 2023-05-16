import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

let jsonURL = "http://localhost:8080";

function SellerPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [seller, setSeller] = useState(null);
  const { sellerId } = useParams();
	const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [address, setAddress] = useState('');
	const [postcode, setPostcode] = useState('');
	const [price, setPrice] = useState(0);
	const [type, setType] = useState('APARTMENT');
	const [bedrooms, setBedrooms] = useState(1);
	const [bathrooms, setBathrooms] = useState(1);
	const [garden, setGarden] = useState(false);
	const [status, setStatus] = useState("For Sale")

  useEffect(() => {
    fetch(`${jsonURL}/seller/${sellerId}`)
      .then(response => response.json())
      .then(data => setSeller(data))
      .catch(error => console.error(error));
  }, [sellerId]);

  useEffect(() => {
    fetch(`${jsonURL}/property?sellerId=${sellerId}`)
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error(error));
  }, [sellerId]);

	const handleManage = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

	const handleEdit = () => {
		setAddress(selectedProperty.address);
		setPostcode(selectedProperty.postcode);
		setPrice(selectedProperty.price);
		setType(selectedProperty.type);
		setBedrooms(selectedProperty.bedroom);
		setBathrooms(selectedProperty.bathroom);
		setGarden(selectedProperty.garden === 1);
		setStatus(selectedProperty.status); // Add this line
		setShowModal(false);
		setShowEditModal(true);
	};

	const handleEditSave = (e) => {
		e.preventDefault();
	
		const updatedProperty = {
			...selectedProperty,
			address,
			postcode,
			price,
			type,
			bedroom: bedrooms,
			bathroom: bathrooms,
			garden: garden ? 1 : 0,
			status, // Add the status field
		};
	
		fetch(`${jsonURL}/property/${selectedProperty.seller.seller_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedProperty),
		})
		.then(() => {
			// Update the properties list to reflect the changes
			setProperties(properties.map((property) => (property.property_id === selectedProperty.property_id ? updatedProperty : property)));
			setShowEditModal(false);
		})
		.catch((error) => console.error(error));
	};

	const handleDelete = () => {
		fetch(`${jsonURL}/property/read/${selectedProperty.seller.seller_id}`, {
			method: 'DELETE',
		})
			.then(() => {
				// Remove the deleted property from the properties list
				setProperties(properties.filter((property) => property.property_id !== selectedProperty.property_id));
				setShowModal(false);
			})
			.catch((error) => console.error(error));
	};

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <h1>{seller.firstName} {seller.surname}'s Properties</h1>
			<Link to={`/add-property/${sellerId}`} className="btn btn-primary">
      <button>Add Property</button>
    	</Link><br/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Type</th>
            <th>Price</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Garden</th>
            <th>Status</th>
            <th></th>{/* Action buttons column */}
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.property_id}>
              <td>{property.property_id}</td>
              <td>{property.address}</td>
              <td>{property.postcode}</td>
              <td>{property.type}</td>
              <td>{property.price}</td>
              <td>{property.bedroom}</td>
              <td>{property.bathroom}</td>
              <td>{property.garden ? 'Yes' : 'No'}</td>
              <td>{property.status}</td>
							<button onClick={() => handleManage(property)}>Manage</button>{/* Action buttons for editing and deleting properties */}
            </tr>
          ))}
        </tbody>
      </table>

			{showModal && (
			<div className="modal">
				<div className="modal-content">
					<h3>Manage Buyer</h3>
					<button onClick={handleEdit}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
					<button onClick={() => setShowModal(false)}>Close</button>
				</div>
			</div>
			)}

			{showEditModal && (
				<div className="modal">
					<div className="modal-content">
						<h3>Edit Buyer</h3>
						<form onSubmit={handleEditSave}>
							<label>
								Address:
								<input
									type="text"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</label><br/>
							<label>
								Postcode:
								<input
									type="text"
									value={postcode}
									onChange={(e) => setPostcode(e.target.value)}
								/>
							</label><br/>
							<label>
								Price:
								<input
									type="number"
									min="0"
									value={price}
									onChange={(e) => setPrice(parseInt(e.target.value))}
								/>
							</label><br/>
							<label>
								Type:
								<select value={type} onChange={(e) => setType(e.target.value)}>
									<option value="APARTMENT">Apartment</option>
									<option value="DETACHED">Detached</option>
									<option value="SEMI_DETACHED">Semi-detached</option>
									<option value="TERRACED">Terraced</option>
									<option value="BUNGALOW">Bungalow</option>
									<option value="COTTAGE">Cottage</option>
								</select>
							</label><br/>
							<label>
								Bedrooms:
								<input
									type="number"
									min="0"
									value={bedrooms}
									onChange={(e) => setBedrooms(parseInt(e.target.value))}
								/>
							</label><br/>
							<label>
								Bathrooms:
								<input
									type="number"
									min="0"
									value={bathrooms}
									onChange={(e) => setBathrooms(parseInt(e.target.value))}
								/>
							</label><br/>
							<legend>Garden:</legend>
							<label>
								<input
									type="radio"
									name="garden"
									checked={garden === true}
									onChange={() => setGarden(true)}
								/>
								Yes
							</label>
							<label>
								<input
									type="radio"
									name="garden"
									checked={garden === false}
									onChange={() => setGarden(false)}
								/>
								No
							</label><br/>
							<label>
								Status:
								<select value={status} onChange={(e) => setStatus(e.target.value)}>
									<option value="FOR SALE">FOR SALE</option>
									<option value="SOLD">SOLD</option>
									<option value="WITHDRAWN">WITHDRAWN</option>
								</select>
							</label>
							<button type="submit">Save</button>
						</form>
						<button onClick={() => setShowEditModal(false)}>Close</button>
					</div>
				</div>
			)}

    </div>
  );
}

export default SellerPropertiesPage;
