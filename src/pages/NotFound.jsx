import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container py-5 text-center">
            <div className="row justify-content-center">
                <div className="col-md-6 py-5">
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <h2 className="mb-3">Trang Không Tồn Tại!</h2>
                    <p className="text-muted mb-4">
                        Rất tiếc, đường dẫn bạn đang truy cập không tồn tại hoặc đã bị di chuyển.
                    </p>
                    <Link to="/" className="btn btn-warning btn-lg fw-bold text-dark px-4">
                        🏠 Quay Về Trang Chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;