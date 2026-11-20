import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 pb-4 mt-5 border-top border-secondary">
            <div className="container">
                {/* Thanh hệ thống cửa hàng */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center pb-4 mb-4 border-bottom border-secondary gap-3">
                    <div>
                        <h5 className="fw-bold mb-1">Hệ thống cửa hàng GiaDungPro trên toàn quốc</h5>
                        <p className="text-secondary mb-0 small">
                            Bao gồm cửa hàng GiaDungPro, Trung tâm Điện máy &amp; Trạm bảo hành chính hãng
                        </p>
                    </div>
                    <Link to="/products" className="btn btn-danger fw-semibold px-4">
                        Xem danh sách sản phẩm &amp; cửa hàng
                    </Link>
                </div>

                {/* 4 cột thông tin chính */}
                <div className="row g-4 small">
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold text-uppercase mb-3">Tải ứng dụng GiaDungPro</h6>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="bg-white text-dark fw-bold p-2 rounded text-center" style={{ width: 64, height: 64, fontSize: 11 }}>
                                QR APP
                            </div>
                            <div className="d-flex flex-column gap-2 flex-fill">
                                <span className="badge bg-secondary py-2 text-start px-3">App Store</span>
                                <span className="badge bg-secondary py-2 text-start px-3">Google Play</span>
                            </div>
                        </div>

                        <h6 className="fw-bold text-uppercase mt-4 mb-2">Kết nối với chúng tôi</h6>
                        <div className="d-flex gap-2 mb-3">
                            <span className="badge rounded-pill bg-primary px-3 py-2">Facebook</span>
                            <span className="badge rounded-pill bg-info text-dark px-3 py-2">Zalo</span>
                            <span className="badge rounded-pill bg-danger px-3 py-2">YouTube</span>
                        </div>

                        <h6 className="fw-bold text-uppercase mb-2">Tổng đài miễn phí</h6>
                        <p className="mb-1 text-secondary">Tư vấn mua hàng: <strong className="text-white">1800.0018</strong><span> (Miễn phí)</span></p>
                        <p className="mb-1 text-secondary">Hỗ trợ kỹ thuật: <strong className="text-white">1800.0019</strong><span> (Miễn phí)</span></p>
                        <p className="mb-0 text-secondary">Góp ý &amp; khiếu nại: <strong className="text-white">1800.0020</strong> (Trong khung giờ 8h-18h)<span></span></p>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold text-uppercase mb-3">Về chúng tôi</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 text-secondary">
                            <li><Link to="/" className="text-decoration-none text-secondary">Giới thiệu về GiaDungPro</Link></li>
                            <li><Link to="/" className="text-decoration-none text-secondary">Quy chế hoạt động</Link></li>
                            <li><Link to="/products" className="text-decoration-none text-secondary">Dự án &amp; khách hàng doanh nghiệp</Link></li>
                            <li><Link to="/products" className="text-decoration-none text-secondary">Tin tức khuyến mãi</Link></li>
                            <li><Link to="/products" className="text-decoration-none text-secondary">Hướng dẫn mua hàng &amp; thanh toán</Link></li>
                            <li><Link to="/products" className="text-decoration-none text-secondary">Tra cứu hóa đơn &amp; bảo hành</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold text-uppercase mb-3">Chính sách</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 text-secondary">
                            <li><Link to="/" className="text-decoration-none text-secondary">Chính sách bảo hành chính hãng</Link></li>
                            <li><Link to="/" className="text-decoration-none text-secondary">Chính sách đổi trả trong 30 ngày</Link></li>
                            <li><Link to="/products" className="text-decoration-none text-secondary">Chính sách trả góp 0% lãi suất</Link></li>
                            <li><Link to="/" className="text-decoration-none text-secondary">Chính sách giao hàng &amp; lắp đặt</Link></li>
                            <li><Link to="/" className="text-decoration-none text-secondary">Chính sách bảo mật thông tin</Link></li>
                            <li><Link to="/" className="text-decoration-none text-secondary">Điều khoản sử dụng</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold text-uppercase mb-3">Hỗ trợ thanh toán</h6>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <span className="badge bg-light text-dark px-2 py-1">VISA</span>
                            <span className="badge bg-light text-dark px-2 py-1">MasterCard</span>
                            <span className="badge bg-light text-dark px-2 py-1">VNPay</span>
                            <span className="badge bg-light text-dark px-2 py-1">MoMo</span>
                            <span className="badge bg-light text-dark px-2 py-1">Apple Pay</span>
                            <span className="badge bg-light text-dark px-2 py-1">Google Pay</span>
                        </div>

                        <h6 className="fw-bold text-uppercase mb-2">Chứng nhận<span>(Mang tính chất tham khảo)</span></h6>
                        <div className="d-flex flex-wrap gap-2">
                            <span className="badge border border-light text-light px-2 py-1">DMCA Protected</span>
                            <span className="badge bg-success px-2 py-1">Đã thông báo Bộ Công Thương</span>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary my-4" />
                <div className="text-center text-secondary small">
                    © 2026 GiaDungPro. Thiết bị điện gia dụng chính hãng.
                </div>
            </div>
        </footer>
    );
}

export default Footer;