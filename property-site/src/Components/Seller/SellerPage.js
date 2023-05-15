import React, { useState, useEffect } from 'react';
import './SellerPage.css'
import { Link, useNavigate } from 'react-router-dom';

let jsonURL = "http://localhost:8080";

function SellerPage() {
  const [sellers, setSellers] = useState([]);
  const [propertyCounts, setPropertyCounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [newSeller, setNewSeller] = useState({
    firstName: '',
    surname: '',
    address: '',
    postcode: '',
    phone: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${jsonURL}/seller/read`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSellers(data);
        /*return Promise.all(
          data.map(seller =>
            fetch(`${jsonURL}/property?sellerId=${seller.id}`)
              .then(response => response.json())
              .then(properties => ({ sellerId: seller.id, count: properties.length }))
          )
        );*/
      })
      //.then(counts => setPropertyCounts(counts))
      .catch(error => console.error(error));
  }, []);

  function getPropertyCount(sellerId) {
    const propertyCount = propertyCounts.find(pc => pc.sellerId === sellerId);
    return propertyCount ? propertyCount.count : '-';
  }

  function handleManageButtonClick(seller) {
    setSelectedSeller(seller);
    setShowModal(true);
  }

  function handleDelete() {
    // Delete the selected seller and update the state
    fetch(`${jsonURL}/${selectedSeller.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        const updatedSellers = sellers.filter(s => s.id !== selectedSeller.id);
        setSellers(updatedSellers);
        setShowModal(false);
      })
      .catch(error => console.error(error));
  }
  
  function handleEdit() {
    // Load the selected seller into the oopup for editing
    setEditingSeller(selectedSeller);
    setShowModal(false);
    setShowEditModal(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (showEditModal) {
      setEditingSeller({ ...editingSeller, [name]: value });
    } else {
      setNewSeller({ ...newSeller, [name]: value });
    }
  }

  function handleEditSave(event) {
    event.preventDefault();
    fetch(`${jsonURL}/seller/update/${selectedSeller.seller_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSeller),
    })
      .then(response => response.json())
      .then(updatedSeller => {
        const updatedSellers = sellers.map(s => (s.id === updatedSeller.id ? updatedSeller : s));
        setSellers(updatedSellers);
        setNewSeller({ firstName: '', surname: '', address: '', postcode: '', phone: '' });
        setShowEditModal(false);
      })
    .catch(error => console.error(error));
  }

  function handleProperties() {
    navigate(`/seller-properties/${selectedSeller.id}`);
    setShowModal(false);
  }

  return (
    <div>
      <h1>Sellers</h1>
      <Link to="/add-seller">
        <button>Add Seller</button>
      </Link>
      <table className='seller-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Phone</th>
            <th>Property Count</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sellers.map(seller => (
            <tr key={seller.seller_id}>
              <td>{seller.seller_id}</td>
              <td>{seller.firstName}</td>
              <td>{seller.surname}</td>
              <td>{seller.email}</td>
              <td>{seller.address}</td>
              <td>{seller.postcode}</td>
              <td>{seller.phone}</td>
              <td>{getPropertyCount(seller.id)}</td>
              <td><button onClick={() => handleManageButtonClick(seller)}>Manage</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Manage Seller</h3>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleProperties}>Manage Properties</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Seller</h3>
            <form onSubmit={handleEditSave}>
              <label>First Name:</label>
              <input type="text" name="firstName" className='submitText' value={editingSeller.firstName} onChange={handleChange} /><br/>

              <label>Surname:</label>
              <input type="text" name="surname" className='submitText' value={editingSeller.surname} onChange={handleChange} /><br/>

              <label>Address:</label>
              <input type="text" name="address" className='submitText' value={editingSeller.address} onChange={handleChange} /><br/>

              <label>Postcode:</label>
              <input type="text" name="postcode" className='submitText' value={editingSeller.postcode} onChange={handleChange} /><br/>

              <label>Phone:</label>
              <input type="text" name="phone" className='submitText' value={editingSeller.phone} onChange={handleChange} /><br/>

              <button type="submit" className="submit-button">Save Changes</button>
            </form>
            <button onClick={() => setShowEditModal(false)}>Close</button>
          </div>
        </div>
      )}
			
    </div>
  );
}

export default SellerPage;
