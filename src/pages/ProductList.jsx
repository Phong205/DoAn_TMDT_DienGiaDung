import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProducts,
  formatPrice,
  FALLBACK_IMG,
  CATEGORY_LABELS,
} from '../services/productApi';

// Các khoảng giá cho bộ lọc
const PRICE_RANGES = [
  { value: 'all', label: 'Tất cả', min: 0, max: Infinity },
  { value: 'u2', label: 'Dưới 2 triệu', min: 0, max: 2000000 },
  { value: '2-5', label: '2 - 5 triệu', min: 2000000, max: 5000000 },
  { value: '5-10', label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { value: 'o10', label: 'Trên 10 triệu', min: 10000000, max: Infinity },
];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State bộ lọc
  const [priceRange, setPriceRange] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Không tải được danh sách sản phẩm.'))
      .finally(() => setLoading(false));
  }, []);

  // Danh sách thương hiệu / danh mục lấy tự động từ dữ liệu
  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  );
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setPriceRange('all');
    setSelectedBrands([]);
    setCategory('all');
    setSortBy('default');
    setKeyword('');
  };

  // Lọc + sắp xếp
  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.value === priceRange);
    const kw = keyword.trim().toLowerCase();

    const result = products.filter((p) => {
      const inPrice = p.price >= range.min && p.price < range.max;
      const inBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const inCategory = category === 'all' || p.category === category;
      const inKeyword = !kw || p.name.toLowerCase().includes(kw);
      return inPrice && inBrand && inCategory && inKeyword;
    });

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return result;
    }
  }, [products, priceRange, selectedBrands, category, sortBy, keyword]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
    <div className="row text-start">
      {/* ===== Cột bộ lọc ===== */}
      <aside className="col-lg-3 mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Bộ lọc</h5>
              <button
                className="btn btn-link btn-sm p-0"
                onClick={resetFilters}
              >
                Xóa lọc
              </button>
            </div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Tìm theo tên..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <h6 className="fw-bold">Danh mục</h6>
            <select
              className="form-select mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c] || c}
                </option>
              ))}
            </select>

            <h6 className="fw-bold">Khoảng giá</h6>
            {PRICE_RANGES.map((r) => (
              <div className="form-check" key={r.value}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceRange"
                  id={`price-${r.value}`}
                  checked={priceRange === r.value}
                  onChange={() => setPriceRange(r.value)}
                />
                <label className="form-check-label" htmlFor={`price-${r.value}`}>
                  {r.label}
                </label>
              </div>
            ))}

            <h6 className="fw-bold mt-3">Thương hiệu</h6>
            {brands.map((brand) => (
              <div className="form-check" key={brand}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <label className="form-check-label" htmlFor={`brand-${brand}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ===== Danh sách sản phẩm ===== */}
      <section className="col-lg-9">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <span className="text-muted">
            Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm
          </span>
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="sortBy" className="text-nowrap mb-0">
              Sắp xếp:
            </label>
            <select
              id="sortBy"
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="alert alert-warning">
            Không có sản phẩm nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredProducts.map((p) => {
              const discount =
                p.originalPrice > p.price
                  ? Math.round((1 - p.price / p.originalPrice) * 100)
                  : 0;
              return (
                <div className="col" key={p.id}>
                  <div className="card h-100 shadow-sm position-relative">
                    {discount > 0 && (
                      <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                        -{discount}%
                      </span>
                    )}
                    <Link to={`/product/${p.id}`}>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="card-img-top p-3"
                        style={{ height: 200, objectFit: 'contain' }}
                        onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <small className="text-muted">{p.brand}</small>
                      <Link
                        to={`/product/${p.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <h6 className="card-title">{p.name}</h6>
                      </Link>
                      <div className="mt-auto">
                        <div className="text-danger fw-bold">
                          {formatPrice(p.price)}
                        </div>
                        {discount > 0 && (
                          <small className="text-muted text-decoration-line-through">
                            {formatPrice(p.originalPrice)}
                          </small>
                        )}
                        <div className="small text-warning">
                          ★ {p.rating ?? '—'}
                        </div>
                        <Link
                          to={`/product/${p.id}`}
                          className="btn btn-outline-primary btn-sm w-100 mt-2"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
    </div>
  );
}

export default ProductList;
