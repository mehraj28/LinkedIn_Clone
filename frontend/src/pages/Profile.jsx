import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile(){
  const { user } = useAuth();
  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
}
