import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddProperty.css"

let jsonURL = "http://localhost:8080";

function AddProperty() {
  const { sellerId } = useParams();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
	const [price, setPrice] = useState(0);
  const [type, setType] = useState("APARTMENT");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [garden, setGarden] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      address,
      postcode,
      type,
      price: 0,
      bedroom: bedrooms,
      bathroom: bathrooms,
      garden: garden ? 1 : 0,
      sellerId: parseInt(sellerId),
      status: "FOR SALE",
    };

    fetch(`${jsonURL}/property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
		.then(() => navigate.push(`/seller-properties/${sellerId}`))
		.catch((error) => console.error(error));

		navigate(`/seller-properties/${sellerId}`);
  };

	const handleCancel = () => {
    navigate(`/seller-properties/${sellerId}`);
  };

  return (
    <div className="add-property-container">
      <h1>Add Property for Seller {sellerId}</h1>
			<form onSubmit={handleSubmit}>
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
				<button type="submit">Add Property</button>
				<button type="button" className="submit-button" onClick={handleCancel}>Cancel</button>
			</form>
		</div>
  );
}

export default AddProperty;
