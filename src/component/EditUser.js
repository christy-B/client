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
  const [mesg, setMsg] = useState("")
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
        console.log(response.data.message);
        setMsg(response.data.message)
        // Rediriger vers la liste des utilisateurs après modification
        //navigate('/');
      })
      .catch((error) => {
        if (error.response.data.message) {
            setMsg(error.response.data.message)
        }
        console.error(error.response.data.errors);
      });
  };

  return (
    <div>
      <h3>Modifier l'utilisateur</h3>
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
        <button type="submit">Enregistrer les modifications</button>
      </form>

      <div><button onClick={() => navigate('/')}>Retour</button></div>
    </div>
  );
};

export default EditUser;
