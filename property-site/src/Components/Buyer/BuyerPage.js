import React, { useState, useEffect } from 'react';
import './BuyerPage.css'
import { Link } from 'react-router-dom';

let jsonURL = "http://localhost:8080"

function BuyerPage() {
  const [buyers, setBuyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [newBuyer, setNewBuyer] = useState({
    firstName: '',
    surname: '',
    address: '',
    postcode: '',
    phone: ''
  });

  useEffect(() => {
    fetch(`${jsonURL}/buyer/read`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setBuyers(data);
        /*return Promise.all(
          data.map(seller =>
            fetch(`${jsonURL}/property?sellerId=${seller.buyer_id}`)
              .then(response => response.json())
              .then(properties => ({ sellerId: seller.buyer_id, count: properties.length }))
          )
        );*/
      })
      .catch(error => console.error(error));
  }, []);

  function handleManageButtonClick(buyer) {
    setSelectedBuyer(buyer);
    setShowModal(true);
  }

  function handleDelete() {
    // Delete the selected buyer and update the state
    fetch(`${jsonURL}/buyer/delete/${selectedBuyer.buyer_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        setShowModal(false);
        return fetch(`${jsonURL}/buyer/read`);
      })
      .then(response => response.json())
      .then(data => {
        setBuyers(data);
      })
      .catch(error => console.error(error));
  }  
  
  function handleEdit() {
    // Load the selected buyer into the form for editing
    setEditingBuyer(selectedBuyer);
    setShowModal(false);
    setShowEditModal(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (showEditModal) {
      setEditingBuyer({ ...editingBuyer, [name]: value });
    } else {
      setNewBuyer({ ...newBuyer, [name]: value });
    }
  }

  function handleEditSave(event) {
    event.preventDefault();
    fetch(`${jsonURL}/${selectedBuyer.buyer_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBuyer),
    })
      .then(response => response.json())
      .then(updatedBuyer => {
        const updatedBuyers = buyers.map(s => (s.buyer_id === updatedBuyer.buyer_id ? updatedBuyer : s));
        setBuyers(updatedBuyers);
        setNewBuyer({ firstName: '', surname: '', address: '', postcode: '', phone: '' });
        setShowEditModal(false);
      })
    .catch(error => console.error(error));
  }

  return (
    <div>
      <h1>Buyers</h1>
      <Link to="/add-buyer">
        <button>Add Buyer</button>
      </Link>
      <table className='buyer-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buyers.map(buyer => (
            <tr key={buyer.buyer_id}>
              <td>{buyer.buyer_id}</td>
              <td>{buyer.firstName}</td>
              <td>{buyer.surname}</td>
              <td>{buyer.email}</td>
              <td>{buyer.address}</td>
              <td>{buyer.postcode}</td>
              <td>{buyer.phone}</td>
              <td><button onClick={() => handleManageButtonClick(buyer)}>Manage</button></td>
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
              <label>First Name:</label>
              <input type="text" name="firstName" className='submitText' value={editingBuyer.firstName} onChange={handleChange} /><br/>

              <label>Surname:</label>
              <input type="text" name="surname" className='submitText' value={editingBuyer.surname} onChange={handleChange} /><br/>

              <label>Address:</label>
              <input type="text" name="address" className='submitText' value={editingBuyer.address} onChange={handleChange} /><br/>

              <label>Postcode:</label>
              <input type="text" name="postcode" className='submitText' value={editingBuyer.postcode} onChange={handleChange} /><br/>

              <label>Phone:</label>
              <input type="text" name="phone" className='submitText' value={editingBuyer.phone} onChange={handleChange} /><br/>

              <button type="submit" className="submit-button">Save Changes</button>
            </form>
            <button onClick={() => setShowEditModal(false)}>Close</button>
          </div>
        </div>
      )}
			
    </div>
  );
}

export default BuyerPage;
