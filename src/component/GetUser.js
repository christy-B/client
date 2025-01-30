import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'


const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState();
  const [isError, setIsError] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      });
  }, []);

  // Fonction pour supprimer un utilisateur
  const handleDelete = (userId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      axios
        .delete(`${API_URL}/${userId}`)
        .then((response) => {
          // Mise à jour de l'état après suppression
          setUsers(users.filter(user => user.id !== userId));
          setMsg(response.data.message);
          setIsError(false);
        })
        .catch((error) => {
            setIsError(true);
            setMsg(error.response.data.message);
        });
    }
  };

  // Fonction pour actualiser la page
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className='table-container'>
        <table border="1">
            <thead>
            <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Date de création</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                <td>
                    {/* Passer toutes les informations via state */}
                    <Link to={`/edit/${user.id}`} state={user}>
                    <button className='btn-orange'>Modifier</button>
                    </Link>
                    <button onClick={() => handleDelete(user.id)} className='btn-red'>Supprimer</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      {/* Bouton pour actualiser la page */}
      <button onClick={handleReload} className='btn-green'>Actualiser</button>

      {/* Bouton pour ajouter un nouvel utilisateur */}
      <Link to="/create">
        <button className='btn-blue'>
          Ajouter un utilisateur
        </button>
      </Link>
      
      {/* Affichage du message (succès ou erreur) */}
      {msg && (
        <div style={{ color: isError ? "red" : "green", fontWeight: "bold", marginBottom: "10px" }}>
          {msg}
        </div>
      )}
    </div>
  );
};

export default GetUser;
