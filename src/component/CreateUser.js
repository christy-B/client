import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    axios.post(`${API_URL}`, { firstname, lastname, email })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response.data.message) {
            console.log(error.response.data.data)
        } else {
            console.log(error.response.data.errors)
        }
      });
  };

  return (
    <div>
      <h2>Ajouter un utilisateur</h2>

      <form onSubmit={handleSubmit}>
        <label>Prénom :</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />

        <label>Nom :</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />

        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit">
          Ajouter
        </button>
      </form>
      <div><button onClick={() => navigate('/')}>Retour</button></div>
      
    </div>
  );
};

export default CreateUser;
