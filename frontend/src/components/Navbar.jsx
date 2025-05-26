import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-grayscale-removebg-preview.png';
import { FaRegUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import axios from 'axios';
import * as bootstrap from 'bootstrap';



export const Navbar = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const user = {
    name: "Vishal",
    phone: "+91 9876543210",
    isLoggedIn: false
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email or Phone:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post('https://ecom-project-nktj.onrender.com/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('authToken', JSON.stringify(res.data));

      const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
      modal.hide();

      console.log(res.data.token);
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  const handleCartClick = () => {
    if (isLoggedIn()) {
      navigate('/cart');
    } else {
      const loginModal = new bootstrap.Modal(document.getElementById('authModal'));
      loginModal.show();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" height="40" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Centered Search */}
        <div className="mx-auto d-none d-lg-block" style={{ width: '300px' }}>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-dark ms-2" type="submit" title="Search">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="d-flex align-items-center gap-2">

            <Link to="/wishlist" className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }} title="Wishlist">
              <FaHeart />
            </Link>

            <Link to="/cart" onClick={handleCartClick}
              className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }} title="Cart">
              <FaShoppingCart />
            </Link>

            <div className="dropdown">
              <button
                className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: '40px', height: '40px' }}
                title="Profile"
              >
                <FaRegUser />
              </button>

              <ul className="dropdown-menu  dropdown-menu-start dropdown-menu-md-end p-3" style={{ minWidth: '240px' }}>
                {
                  isLoggedIn() && <>
                    <li className="mb-2 px-2">
                      <div className="d-flex align-items-center">
                        <FaRegUser className="me-3 fs-5" />
                        <div className="d-flex flex-column">
                          <span className="fw-semibold">{JSON.parse(localStorage.getItem("authToken")).user.email}</span>
                          <span className="text-muted small">{JSON.parse(localStorage.getItem("authToken")).user.phone}</span>
                        </div>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                }

                {!isLoggedIn() && <>
                  <li>
                    <button className="btn btn-primary w-100 mb-2" data-bs-toggle="modal" data-bs-target="#authModal">
                      Sign In
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                </>}

                <li className="mb-2">
                  <Link className="dropdown-item" to="/orders">My Orders</Link>
                </li>

                {isLoggedIn() && <>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => {
                      localStorage.removeItem('authToken');
                      window.location.reload();
                    }}>
                      Logout
                    </button>
                  </li>
                </>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Login/Register Modal */}
      <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="authModalLabel">Login / Register</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email or Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter email or phone number"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">Continue</button>
              </form>

              <div className="text-center my-3">or</div>

              <div id="g_id_onload"
                data-client_id="1234567890-abc.apps.googleusercontent.com"
                data-login_uri="http://localhost:3000/google-login"
                data-auto_prompt="false">
              </div>
              <div className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
