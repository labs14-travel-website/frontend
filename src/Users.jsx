import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data: { users }} = await axios.get('https://roamly-staging.herokuapp.com/api/users');
      setUsers(users);
    };
    getUsers();
  }, []);

  return users.map(user => <h1>{user.username}</h1>);
}

export default Users;
