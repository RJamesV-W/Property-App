import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./PropertyPage.css"

let jsonURL = "http://localhost:8080";

function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    address: '',
    postcode: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    garden: '',
    status: ''
  });

  useEffect(() => {
    fetch(`${jsonURL}/property/read`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
        console.log(data)
      })
      .catch((error) => console.error(error));
  }, []);

  function handleSearchChange(e) {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    setShowSearchModal(false);
  
    const filteredProperties = properties.filter((property) => {
      const addressMatch = !searchCriteria.address || property.address.toLowerCase().includes(searchCriteria.address.toLowerCase());
      const postcodeMatch = !searchCriteria.postcode || property.postcode.toLowerCase().includes(searchCriteria.postcode.toLowerCase());
      const minPriceMatch = !searchCriteria.minPrice || property.price >= searchCriteria.minPrice;
      const maxPriceMatch = !searchCriteria.maxPrice || property.price <= searchCriteria.maxPrice;
      const typeMatch = !searchCriteria.type || property.type === searchCriteria.type;
      const bedroomsMatch = !searchCriteria.bedrooms || property.bedroom === parseInt(searchCriteria.bedrooms);
      const bathroomsMatch = !searchCriteria.bathrooms || property.bathroom === parseInt(searchCriteria.bathrooms);
      const gardenMatch = searchCriteria.garden === '' || (property.garden === 1 && searchCriteria.garden === '1') || (property.garden === 0 && searchCriteria.garden === '0');
      const statusMatch = !searchCriteria.status || property.status === searchCriteria.status;
  
      return addressMatch && postcodeMatch && minPriceMatch && maxPriceMatch && typeMatch && bedroomsMatch && bathroomsMatch && gardenMatch && statusMatch;
    });
  
    setFilteredProperties(filteredProperties);
  }

  const resetSearchCriteria = () => {
    setSearchCriteria({
      address: '',
      postcode: '',
      minPrice: '',
      maxPrice: '',
      type: '',
      bedrooms: '',
      bathrooms: '',
      garden: '',
      status: ''
    });
  };  

  return (
    <div>
      <h1>Properties</h1>
      <button onClick={() => setShowSearchModal(true)}>Search</button>
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
            <th>Seller ID</th>
            <th>Status</th>
            <th>Buyer ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.address}</td>
              <td>{property.postcode}</td>
              <td>{property.type}</td>
              <td>{property.price}</td>
              <td>{property.bedrooms}</td>
              <td>{property.bathrooms}</td>
              <td>{property.garden === 1 ? 'Yes' : 'No'}</td>
              <td>{property.sellerId}</td>
              <td>{property.status}</td>
              <td>{property.buyerId || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showSearchModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Search Properties</h3>
            <form onSubmit={handleSearchSubmit}>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={searchCriteria.address}
                  onChange={handleSearchChange}
                />
              </label><br/>

              <label>
                Postcode:
                <input
                  type="text"
                  name="postcode"
                  value={searchCriteria.postcode}
                  onChange={handleSearchChange}
                />
              </label><br/>

              <label>
                Min Price:
                <input
                  type="number"
                  name="minPrice"
                  min="0"
                  value={searchCriteria.minPrice}
                  onChange={handleSearchChange}
                />
              </label><br />
              <label>
                Max Price:
                <input
                  type="number"
                  name="maxPrice"
                  min="0"
                  value={searchCriteria.maxPrice}
                  onChange={handleSearchChange}
                />
              </label><br />

              <label>
                Type:
                <select name="type" value={searchCriteria.type} onChange={handleSearchChange}>
                  <option value="">Any</option>
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
                  name="bedroom"
                  min="0"
                  value={searchCriteria.bedroom}
                  onChange={handleSearchChange}
                />
              </label><br/>

              <label>
                Bathrooms:
                <input
                  type="number"
                  name="bathroom"
                  min="0"
                  value={searchCriteria.bathroom}
                  onChange={handleSearchChange}
                />
              </label><br/>

              <legend>Garden:</legend>
              <label>
                <input
                  type="radio"
                  name="garden"
                  value="1"
                  checked={searchCriteria.garden === '1'}
                  onChange={handleSearchChange}/>
                Yes
              </label>
              <label>
                <input 
                type="radio" 
                name="garden" 
                value="0" 
                checked={searchCriteria.garden === '0'} 
                onChange={handleSearchChange}/>
                No
              </label>
              <label>
                <input 
                type="radio" 
                name="garden" 
                value="" 
                checked={searchCriteria.garden === ''} 
                onChange={handleSearchChange}/> 
                Any 
              </label><br/>

              <label>
                Status: 
                <select 
                name="status" 
                value={searchCriteria.status} 
                onChange={handleSearchChange}> 
                <option value="">Any</option> 
                <option value="FOR SALE">FOR SALE</option> 
                <option value="SOLD">SOLD</option> 
                <option value="WITHDRAWN">WITHDRAWN</option> 
                </select> 
              </label><br/> 

              <button type="submit">Search</button> 
              </form> 

            <button onClick={() => setShowSearchModal(false)}>Close</button> 
          </div>
        </div>
      )}

    </div>
  );
}

export default PropertyPage;
