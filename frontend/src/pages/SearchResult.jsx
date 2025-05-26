import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
        setProducts(res.data || []);
        setError(null);
      } catch (err) {
        setError('Something went wrong while fetching results.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <p className="text-center mt-5">Loading results...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Result</h3>
        <Link to="/all-products" className="btn btn-link text-decoration-none">View All</Link>
      </div>

      <div className="row mt-3">
        {products.map(product => {
          const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

          return (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
              <Link to={`/product-details/${product._id}`} className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm h-100 position-relative">
                  <div className="ratio ratio-1x1">
                    <img
                      src={product.imageUrl || '/fallback.jpg'}
                      alt={product.name || 'Product'}
                      className="card-img-top img-fluid"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title text-truncate">{product.name}</h5>
                    <p className="card-text text-muted small text-truncate" style={{ WebkitLineClamp: 2 }}>{product.description}</p>

                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-success me-2">4.3 ★</span>
                      <small className="text-muted">(215 ratings)</small>
                    </div>

                    <div className="d-flex align-items-center">
                      <h6 className="mb-0 text-success me-2">₹{product.price}</h6>
                      <small className="text-muted text-decoration-line-through me-2">₹{product.mrp}</small>
                      <small className="text-danger">{discount}% OFF</small>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
