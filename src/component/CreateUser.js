import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mesg, setMsg] = useState();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg(null);

    axios.post(`${API_URL}`, { firstname, lastname, email })
      .then((response) => {
        setMsg(response.data.message);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        if (error.response.data.message) {
            setMsg(error.response.data.message);
        } else {
            setMsg(error.response.data.errors);

        }
      });
  };

  return (
    <div>
      <h2>Ajouter un utilisateur</h2>

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
        <label>Prénom :</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />

        <label>Nom :</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />

        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit" className='btn-green'>
          Ajouter
        </button>
      </form>
      <div><button onClick={() => navigate('/')} className='btn-red'>Retour</button></div>
      
    </div>
  );
};

export default CreateUser;
