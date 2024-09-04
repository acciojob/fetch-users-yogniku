import React, { useState } from 'react';
import axios from 'axios';

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (

        <table>
        <p>No data found to display</p>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} width="50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchUsers;
