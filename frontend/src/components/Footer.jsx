import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Company Information */}
          <div className="col-md-4">
            <h5 className="fw-bold">Goodies</h5>
            <p>Providing top-quality products and services since 2020. Our mission is to bring the best online shopping experience to our customers.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/shop" className="text-white text-decoration-none">Shop</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
              <li><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <p>&copy; 2025 Goodies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
