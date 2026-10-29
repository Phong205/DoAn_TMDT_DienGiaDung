import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <header className="sticky-top shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4 text-warning" to="/">
                        ⚡ GiaDungPro
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Trang Chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Sản Phẩm</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <Link to="/cart" className="btn btn-outline-light position-relative">
                                🛒 Giỏ Hàng
                                {totalQuantity > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQuantity}
                  </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;