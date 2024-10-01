 // TrangChu.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TrangChu = () => {
  const [tongSoNguoiDung, setTongSoNguoiDung] = useState(0);
  const [baoCaoGanNhat, setBaoCaoGanNhat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Lấy tổng số người dùng
      const nguoiDungSnapshot = await getDocs(collection(db, 'users'));
      setTongSoNguoiDung(nguoiDungSnapshot.size);

      // Lấy 5 báo cáo gần nhất
      const baoCaoQuery = query(collection(db, 'dailyReports'), orderBy('timestamp', 'desc'), limit(5));
      const baoCaoSnapshot = await getDocs(baoCaoQuery);
      setBaoCaoGanNhat(baoCaoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Tổng số người dùng */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Tổng số người dùng
            </Typography>
            <Typography component="p" variant="h4">
              {tongSoNguoiDung}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Báo cáo gần nhất */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Báo cáo gần nhất
            </Typography>
            {baoCaoGanNhat.map((baoCao) => (
              <Typography key={baoCao.id} component="p" variant="body1">
                {new Date(baoCao.timestamp.seconds * 1000).toLocaleDateString()} - {baoCao.title}
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrangChu;
