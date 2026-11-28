import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, getProducts, FALLBACK_IMG } from '../services/productApi';

const CATEGORIES = [
    { name: 'Tủ Lạnh Inverter', icon: '🧊', code: 'tu-lanh' },
    { name: 'Máy Giặt - Sấy', icon: '🌀', code: 'may-giat' },
    { name: 'Điều Hòa - Máy Lạnh', icon: '❄️', code: 'dieu-hoa' },
    { name: 'Nồi Cơm Điện', icon: '🍚', code: 'noi-com' },
    { name: 'Nồi Chiên Không Dầu', icon: '🍳', code: 'noi-chien' },
    { name: 'Quạt Điện', icon: '💨', code: 'quat' },
    { name: 'Máy Lọc Không Khí', icon: '🌬️', code: 'may-loc-khong-khi' },
    { name: 'Lò Vi Sóng & Bếp Từ', icon: '🍲', code: 'nha-bep' },
];

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch((err) => {
                console.error('Lỗi khi tải sản phẩm:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) {
            return products;
        }
        return products.filter((item) => item.category === selectedCategory);
    }, [products, selectedCategory]);

    return (
        <div className="container py-4">
            <div className="row g-3 mb-5">
                <div className="col-lg-8">
                    <div id="homeBannerCarousel" className="carousel slide rounded-3 overflow-hidden shadow-sm h-100" data-bs-ride="carousel">
                        <div className="carousel-inner h-100">
                            <div className="carousel-item active bg-dark text-white p-5 h-100">
                                <span className="badge bg-warning text-dark mb-2">SIÊU SALE GIA DỤNG</span>
                                <h1 className="display-6 fw-bold text-warning">Siêu Thị Điện Gia Dụng Pro</h1>
                                <p className="fs-6 text-light opacity-75">
                                    Cung cấp các thiết bị gia dụng thông minh, chính hãng, hiện đại cho ngôi nhà của bạn với mức giá ưu đãi nhất.
                                </p>
                                <Link to="/products" className="btn btn-warning fw-bold text-dark">
                                    Khám Phá Sản Phẩm Ngay
                                </Link>
                            </div>
                            <div className="carousel-item bg-primary text-white p-5 h-100">
                                <span className="badge bg-light text-dark mb-2">TRẢ GÓP 0% LÃI SUẤT</span>
                                <h2 className="fw-bold">Nâng Cấp Không Gian Sống Tiện Nghi</h2>
                                <p className="fs-6 text-light opacity-75">
                                    Giao lắp tận nơi, bảo hành chính hãng, nhiều chương trình ưu đãi cho tủ lạnh, máy giặt và điều hòa.
                                </p>
                                <Link to="/products" className="btn btn-light fw-bold text-dark">
                                    Xem Tất Cả Ưu Đãi
                                </Link>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#homeBannerCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#homeBannerCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="col-lg-4 d-flex flex-column gap-3">
                    <div className="p-4 rounded-3 bg-warning text-dark shadow-sm flex-fill d-flex flex-column justify-content-between">
                        <div>
                            <span className="badge bg-dark text-warning mb-2">HOT DEAL NHÀ BẾP</span>
                            <h5 className="fw-bold">Nồi Cơm &amp; Nồi Chiên Không Dầu</h5>
                            <p className="small mb-2">Thiết kế hiện đại, nấu ăn nhanh gọn cho gia đình.</p>
                        </div>
                        <Link to="/products" className="btn btn-dark btn-sm align-self-start">
                            Xem ngay
                        </Link>
                    </div>
                    <div className="p-4 rounded-3 bg-danger text-white shadow-sm flex-fill d-flex flex-column justify-content-between">
                        <div>
                            <span className="badge bg-light text-danger mb-2">ƯU ĐÃI ĐIỆN LẠNH</span>
                            <h5 className="fw-bold">Tủ Lạnh – Máy Giặt – Điều Hòa</h5>
                            <p className="small mb-2">Vận hành êm ái, tiết kiệm điện năng tối ưu.</p>
                        </div>
                        <Link to="/products" className="btn btn-light btn-sm text-danger fw-bold align-self-start">
                            Khám phá
                        </Link>
                    </div>
                </div>
            </div>

            <section className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className="fw-bold mb-1">Danh Mục Thiết Bị Điện</h2>
                        <p className="text-muted small mb-0">Lựa chọn các thiết bị phù hợp cho không gian sống</p>
                    </div>
                    {selectedCategory && (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setSelectedCategory('')}
                        >
                            Bỏ lọc danh mục
                        </button>
                    )}
                </div>

                <div className="row row-cols-2 row-cols-md-4 row-cols-lg-8 g-2 text-center">
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.code;
                        return (
                            <div className="col" key={cat.code}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory(isActive ? '' : cat.code)}
                                    className={`w-100 h-100 p-3 rounded-3 border ${
                                        isActive ? 'bg-warning border-warning fw-bold shadow-sm' : 'bg-white'
                                    }`}
                                >
                                    <div className="fs-3 mb-1">{cat.icon}</div>
                                    <div className="small lh-sm">{cat.name}</div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

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
                    {filteredProducts.slice(0, 4).map((product) => (
                        <div className="col-md-3 mb-4" key={product.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={product.image || FALLBACK_IMG}
                                    className="card-img-top p-3"
                                    alt={product.name}
                                    style={{ height: '200px', objectFit: 'contain' }}
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK_IMG;
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fs-6 fw-bold">{product.name}</h5>
                                    <p className="text-danger fw-bold fs-5 mt-auto">
                                        {formatPrice(product.price)}
                                    </p>
                                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark btn-sm mt-2">
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