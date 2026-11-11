import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light">
                {/* Thanh điều hướng chung cho toàn website */}
                <Header />

                {/* Khu vực chứa nội dung thay đổi theo đường dẫn URL */}
                <main className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/checkout/success" element={<OrderSuccess />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;