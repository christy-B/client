import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'


const GetUser = () => {
  const [users, setUsers] = useState([]);
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
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
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
                  <button>Modifier</button>
                </Link>
                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetUser;
