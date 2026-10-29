import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//import giỏ hàng
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
      <Router>
        {/* Header tạm thời để test chuyển trang */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <Link className="navbar-brand" to="/">Điện Gia Dụng TMĐT</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Trang chủ (Thành viên 1)</Link>
            <Link className="nav-link" to="/products">Sản phẩm (Thành viên 2)</Link>
            <Link className="nav-link" to="/cart">Giỏ hàng (Thành viên 3)</Link>
            <Link className="nav-link" to="/checkout">Thanh toán (Thành viên 3)</Link>
          </div>
        </nav>

        {/* Nội dung thay đổi theo Route */}
        <div className="container my-4" style={{ minHeight: '60vh' }}>
          <Routes>
            <Route path="/" element={<h2>Trang Chủ (Thành viên 1 phụ trách)</h2>} />
            <Route path="/products" element={<h2>Danh sách & Chi tiết sản phẩm (Thành viên 2 phụ trách)</h2>} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        {/* Footer chung */}
        <footer className="bg-dark text-white text-center py-3">
          <p className="mb-0">Đồ án TMĐT - Bán Đồ Điện Gia Dụng © 2026</p>
        </footer>

      </Router>
  );
}

export default App;