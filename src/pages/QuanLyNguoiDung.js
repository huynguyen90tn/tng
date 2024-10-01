 // QuanLyNguoiDung.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const QuanLyNguoiDung = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleOpen = (user = { name: '', email: '', role: '' }) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (currentUser.id) {
      await updateDoc(doc(db, 'users', currentUser.id), currentUser);
    } else {
      await addDoc(collection(db, 'users'), currentUser);
    }
    handleClose();
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    fetchUsers();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Thêm Người Dùng
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai Trò</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user)}>Sửa</Button>
                  <Button onClick={() => handleDelete(user.id)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser.id ? 'Sửa Người Dùng' : 'Thêm Người Dùng'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            fullWidth
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Vai Trò"
            fullWidth
            value={currentUser.role}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuanLyNguoiDung;
