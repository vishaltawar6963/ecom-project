import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import grocery from '../assets/grocery-removebg-preview.png';
import toys from '../assets/Pngtree-kids toys_17289992.png';
import hdecor from '../assets/home-decor.png';
import beauty from '../assets/beauty.png';
import fashion from '../assets/fashion.png';
import electronics from '../assets/electronics.png';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecom-project-nktj.onrender.com/api/products/');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
      console.error(err);
    }
  };

  const categories = [
    { label: "Electronics", image: electronics },
    { label: "Fashion & Apparel", image: fashion },
    { label: "Beauty & Personal Care", image: beauty },
    { label: "Home & Kitchen", image: hdecor },
    { label: "Toys & Gifts / Hobbies", image: toys },
    { label: "Food & Beverages", image: grocery },
  ];

  const handleCategorySearch = (e, category) => {
    e.preventDefault();
    if (category.trim()) {
      navigate(`/search?q=${encodeURIComponent(category.trim())}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container p-3 text-center">
        <h5>Loading products...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-3 text-center text-danger">
        <h5>{error}</h5>
      </div>
    );
  }

  return (
    <div className="container p-0">
      {/* Categories Section */}
      <div className="container py-3">
        <h5 className="mb-3">Shop by Category</h5>
        <div className="row g-3">
          {categories.map((cat, index) => (
            <div key={index} className="col-4 col-sm-3 col-md-2">
              <div
                className="text-center"
                style={{
                  padding: "10px",
                  borderRadius: "16px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0px)")}
                onClick={e => handleCategorySearch(e, cat.label)}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  style={{ width: "70px", height: "70px", objectFit: "contain", marginBottom: "10px" }}
                />
                <div style={{
                  fontSize: "14px", color: "#333", WebkitLineClamp: 1,
                }}>{cat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      <div id="homeCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner position-relative" style={{ aspectRatio: '4 / 1' }}>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 h-100"
              alt="Slide 1"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 h-100"
              alt="Slide 2"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1633346702973-f0c774e6a473?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 h-100"
              alt="Slide 3"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
          aria-label="Previous Slide"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
          aria-label="Next Slide"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>

      {/* Best Sellers Section */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Best Sellers</h3>
          <a href="#" className="btn btn-link text-decoration-none">View All</a>
        </div>

        <div className="row mt-3">
          {products
            .filter(item => item.badge?.label === "Bestseller")
            .map(product => {
              const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4" key={product._id}>
                  <Link to={`/product-details/${product._id}`} className="text-decoration-none text-dark">
                    <div className="card border-0 shadow-sm position-relative h-100">
                      {/* Badge */}
                      {product.badge && (
                        <span
                          className={`badge bg-${product.badge.color} text-light position-absolute top-0 end-0 m-2 z-1`}
                        >
                          {product.badge.label}
                        </span>
                      )}

                      {/* Image */}
                      <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="card-img-top img-fluid"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>

                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 1,
                          }}
                        >
                          {product.name}
                        </h5>

                        <p
                          className="card-text text-muted small"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 2,
                          }}
                        >
                          {product.description}
                        </p>

                        <div className="d-flex align-items-center mb-2">
                          <span className="badge bg-success me-2">4.3 ★</span>
                          <small className="text-muted">(215 ratings)</small>
                        </div>

                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 text-success me-2">₹{product.price}</h6>
                          <small className="text-muted text-decoration-line-through">₹{product.mrp}</small>
                          {discount > 0 && (
                            <small className="ms-2 text-danger">({discount}% OFF)</small>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
