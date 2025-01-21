'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Table, TableRow, TableCell, TableHeader, TableBody, TableColumn } from '@nextui-org/react';
import axios from 'axios';

export default function UserTable() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8003/users/me', { withCredentials: true })
      .then((response) => {
        setUserData(response.data);
        setEditedName(response.data.username); // Initialize editedName
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  // Handle save functionality
  const handleSave = () => {
    if (!userData) return;

    axios
      .put(
        `http://localhost:8003/users/${userData.id}`,
        { username: editedName },
        { withCredentials: true }
      )
      .then((response) => {
        setUserData(response.data); // Update data with server response
        setIsEditing(false); // Exit editing mode
      })
      .catch((error) => console.error('Error saving user data:', error));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Table aria-label="User Data Table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            {/* Editable Name Cell */}
            <TableCell>
              {isEditing ? (
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  fullWidth
                  autoFocus
                />
              ) : (
                <p>{userData.username}</p>
              )}
            </TableCell>

            {/* Non-Editable Email Cell */}
            <TableCell>
              <p>{userData.email}</p>
            </TableCell>

            {/* Action Buttons */}
            <TableCell>
              {isEditing ? (
                <Button auto flat color="success" onPress={handleSave}>
                  Save
                </Button>
              ) : (
                <Button auto flat color="primary" onPress={toggleEdit}>
                  Edit
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
