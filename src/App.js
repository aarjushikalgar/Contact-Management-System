import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:3001/api/contacts');
    setContacts(response.data);
  };

  const addContact = async () => {
    await axios.post('http://localhost:3001/api/contacts', { name, email, phone });
    fetchContacts();
    setName('');
    setEmail('');
    setPhone('');
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:3001/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div>
      <h1>Contact Management System</h1>
      <div>
        <h2>Add Contact</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button onClick={addContact}>Add</button>
      </div>
      <div>
        <h2>Contact List</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.name} - {contact.email} - {contact.phone}{' '}
              <button onClick={() => deleteContact(contact._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
