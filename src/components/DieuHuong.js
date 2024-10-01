 // DieuHuong.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { XacThucContext } from '../contexts/XacThucContext';

const DieuHuong = () => {
  const { nguoiDung } = useContext(XacThucContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Trang Chủ</Button>
        {nguoiDung ? (
          <>
            <Button color="inherit" component={Link} to="/quan-ly-nguoi-dung">Quản Lý Người Dùng</Button>
            <Button color="inherit" component={Link} to="/quan-ly-bao-cao">Quản Lý Báo Cáo</Button>
            <Button color="inherit">Đăng Xuất</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/dang-nhap">Đăng Nhập</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DieuHuong;
