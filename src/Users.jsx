import React, { useState, useEffect } from 'react';
import axios from 'axios';
import store from "./utils/jwt-store";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Get:  ", store.get());
    const getUsers = async () => {
      const { data: { users }} = await axios.get('http://localhost:8000/api/users',
          {
        headers: {
          Authorization: store.get()
        }
      }
      );
      console.log("Users: ", users);
      setUsers(users);
    };
    getUsers();
  }, []);

  return users.map(user => <h1>{user.name}</h1>);
}

export default Users;

