import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Đăng nhập thành công với tài khoản: ${email}`);
        navigate('/');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="text-center fw-bold mb-4">Đăng Nhập</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">
                                Đăng Nhập
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted">Chưa có tài khoản? </span>
                            <Link to="/register" className="text-decoration-none fw-bold text-warning">Đăng ký ngay</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;