import React, { useState, useEffect } from 'react';
import axios from 'axios';
import store from './utils/jwt-store';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data: { users: userList } } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/users`,
        {
          headers: {
            Authorization: store.get(),
          },
        });
      setUsers(userList);
    };
    getUsers();
  }, []);

  return users.map(user => <h1>{user.name}</h1>);
};

export default Users;
