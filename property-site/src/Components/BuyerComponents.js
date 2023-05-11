import React, { useState, useEffect } from 'react';
import './BuyerPage.css'

let jsonURL = "http://localhost:8080/buyer"

function BuyerPage() {
  const [buyers, setBuyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [editMode, setEditMode] = useState(false);
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
    fetch(jsonURL)
      .then(response => response.json())
      .then(data => setBuyers(data))
      .catch(error => console.error(error));
  }, []);

  function handleManageButtonClick(buyer) {
    setSelectedBuyer(buyer);
    setShowModal(true);
  }

  function handleDelete() {
    // Delete the selected buyer and update the state
    fetch(`${jsonURL}/${selectedBuyer.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        const updatedBuyers = buyers.filter(s => s.id !== selectedBuyer.id);
        const reindexedBuyers = updatedBuyers.map((s, index) => ({ ...s, id: index + 1 }));
        setBuyers(reindexedBuyers);
        setShowModal(false);
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

  function handleSubmit(event) {
    event.preventDefault();
    if (editMode) {
      handleEditSave(event);
    } else {
    fetch(jsonURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBuyer),
    })
      .then(response => response.json())
      .then(data => setBuyers([...buyers, data]))
      .catch(error => console.error(error));
    setNewBuyer({ firstName: '', surname: '', address: '', postcode: '', phone: '' });
    }
  }

  function handleCancel() {
    setNewBuyer({
      firstName: "",
      surname: "",
      address: "",
      postcode: "",
      phone: "",
    });
  }

  function handleEditCancel() {
    setNewBuyer({ firstName: '', surname: '', address: '', postcode: '', phone: '' });
    setEditMode(false);
  }

  function handleEditSave(event) {
    event.preventDefault();
    fetch(`${jsonURL}/${selectedBuyer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBuyer),
    })
      .then(response => response.json())
      .then(updatedBuyer => {
        const updatedBuyers = buyers.map(s => (s.id === updatedBuyer.id ? updatedBuyer : s));
        setBuyers(updatedBuyers);
        setNewBuyer({ firstName: '', surname: '', address: '', postcode: '', phone: '' });
        setShowEditModal(false);
      })
    .catch(error => console.error(error));
  }

  return (
    <div>
      <h1>Buyers</h1>
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{editMode ? 'Edit Buyer' : 'Add Buyer'}</h2>
            <label>First Name:</label>
            <input type="text" name="firstName" className='submitText' value={newBuyer.firstName} onChange={handleChange} /><br/>
            
            <label>Surname:</label>
            <input type="text" name="surname" className='submitText' value={newBuyer.surname} onChange={handleChange} /><br/>
            
            <label>Address:</label>
            <input type="text" name="address" className='submitText' value={newBuyer.address} onChange={handleChange} /><br/>
            
            <label>Postcode:</label>
            <input type="text" name="postcode" className='submitText' value={newBuyer.postcode} onChange={handleChange} /><br/>
            
            <label>Phone:</label>
            <input type="text" name="phone" className='submitText' value={newBuyer.phone} onChange={handleChange} /><br/>
            
            <button type="submit" className="submit-button">
              {editMode ? 'Save Changes' : 'Add Buyer'}
            </button>
            <button type="button" className="submit-button" onClick={editMode ? handleEditCancel : handleCancel}>
              Cancel
            </button>
        </form><br/>
      <table className='buyer-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map(buyer => (
            <tr key={buyer.id}>
              <td>{buyer.id}</td>
              <td>{buyer.firstName}</td>
              <td>{buyer.surname}</td>
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
