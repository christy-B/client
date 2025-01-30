import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const location = useLocation();  // Récupérer les données passées via state
  const user = location.state; 
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });
  const [mesg, setMsg] = useState()
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour soumettre les données modifiées
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/${user.id}`, formData)
      .then((response) => {
        setMsg(response.data.message)
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        if (error.response.data.message) {
            setMsg(error.response.data.message)
        }else{
            setMsg(error.response.data.errors)
        }
        
      });
  };

  return (
    <div>
      <h3>Modifier l'utilisateur</h3>
      
      {/* Affichage du message */}
      {mesg && (
        <div style={{ color: isError ? "red" : "green", fontWeight: "bold" }}>
          {Array.isArray(mesg) ? (
            <ul>{mesg.map((err, index) => <li key={index}>{err}</li>)}</ul>
          ) : (
            <p>{mesg}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Prénom</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
        />
        <br />
        <label>Nom</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit" className='btn-green'>Enregistrer les modifications</button>
      </form>

      <div><button onClick={() => navigate('/')} className='btn-red'>Retour</button></div>
    </div>
  );
};

export default EditUser;
