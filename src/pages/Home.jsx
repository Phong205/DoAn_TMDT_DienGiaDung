import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gọi API lấy danh sách sản phẩm từ JSON Server
    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Lỗi khi tải sản phẩm:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container py-4">
            {/* Banner quảng cáo / Giới thiệu */}
            <div className="p-5 mb-4 bg-dark text-white rounded-3 shadow-sm">
                <div className="container-fluid py-3">
                    <h1 className="display-5 fw-bold text-warning">Siêu Thị Điện Gia Dụng Pro</h1>
                    <p className="col-md-8 fs-4">
                        Cung cấp các thiết bị gia dụng thông minh, chính hãng, hiện đại cho ngôi nhà của bạn với mức giá ưu đãi nhất.
                    </p>
                    <Link to="/products" className="btn btn-warning btn-lg fw-bold text-dark">
                        Khám Phá Sản Phẩm Ngay
                    </Link>
                </div>
            </div>

            {/* Danh mục nổi bật */}
            <div className="row text-center mb-5">
                <div className="col-12 mb-3">
                    <h2 className="fw-bold">Danh Mục Nổi Bật</h2>
                    <p className="text-muted">Lựa chọn các thiết bị phù hợp cho không gian sống</p>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm border-0 bg-white p-3">
                        <h4>❄️ Tủ Lạnh & Điều Hòa</h4>
                        <p className="text-muted small">Tiết kiệm điện năng, làm lạnh nhanh.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm border-0 bg-white p-3">
                        <h4>🌀 Máy Giặt & Sấy</h4>
                        <p className="text-muted small">Bảo vệ sợi vải, vận hành êm ái.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm border-0 bg-white p-3">
                        <h4>🍳 Thiết Bị Nhà Bếp</h4>
                        <p className="text-muted small">Nồi chiên, lò vi sóng, bếp từ thông minh.</p>
                    </div>
                </div>
            </div>

            {/* Danh sách sản phẩm nổi bật từ API */}
            <div className="row mb-3">
                <div className="col-12">
                    <h2 className="fw-bold mb-3">Sản Phẩm Nổi Bật</h2>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {products.slice(0, 4).map((product) => (
                        <div className="col-md-3 mb-4" key={product.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={product.image || "https://via.placeholder.com/300"}
                                    className="card-img-top p-3"
                                    alt={product.name}
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fs-6 fw-bold">{product.name}</h5>
                                    <p className="text-danger fw-bold fs-5 mt-auto">
                                        {product.price?.toLocaleString()} đ
                                    </p>
                                    <Link to={`/products`} className="btn btn-outline-dark btn-sm mt-2">
                                        Xem Chi Tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;