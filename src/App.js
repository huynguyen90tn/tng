 // App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { XacThucProvider } from './contexts/XacThucContext';
import DieuHuong from './components/DieuHuong';
import TrangChu from './pages/TrangChu';
import QuanLyNguoiDung from './pages/QuanLyNguoiDung';
import QuanLyBaoCao from './pages/QuanLyBaoCao';
import DangNhap from './components/DangNhap';

function App() {
  return (
    <XacThucProvider>
      <Router>
        <DieuHuong />
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/quan-ly-nguoi-dung" element={<QuanLyNguoiDung />} />
          <Route path="/quan-ly-bao-cao" element={<QuanLyBaoCao />} />
          <Route path="/dang-nhap" element={<DangNhap />} />
        </Routes>
      </Router>
    </XacThucProvider>
  );
}

export default App;
