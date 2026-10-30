import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light">
                {/* Thanh điều hướng chung cho toàn website */}
                <Header />

                {/* Khu vực chứa nội dung thay đổi theo đường dẫn URL */}
                <main className="flex-fill">
                    <Routes>
                        {/* Trang chủ do Thành viên 1 phụ trách */}
                        <Route path="/" element={<Home />} />

                        {/* Các trang sẽ được bàn giao cho các thành viên phát triển tiếp theo */}
                        {/* <Route path="/products" element={<ProductList />} /> */}
                        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
                        {/* <Route path="/cart" element={<Cart />} /> */}
                        {/* <Route path="/checkout" element={<Checkout />} /> */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;