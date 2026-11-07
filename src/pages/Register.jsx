import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        alert(`Đăng ký tài khoản thành công cho: ${name}`);
        navigate('/login');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="text-center fw-bold mb-4">Đăng Ký Tài Khoản</h2>
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Họ và tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Nhập họ tên của bạn"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Nhập email"
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
                                    placeholder="Tạo mật khẩu"
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100 py-2 fw-bold text-dark">
                                Đăng Ký
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted">Đã có tài khoản? </span>
                            <Link to="/login" className="text-decoration-none fw-bold text-dark">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;