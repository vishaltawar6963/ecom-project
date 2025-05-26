import { CartComponent } from './components/CartComponent';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import ProductDetails from './components/ProductDetails';
import logo from './logo.svg';
import { About } from './pages/About';
import ColorPalette from './pages/ColorPalette';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './custom-bootstrap.scss';
import CartPretected from './components/CartPretected';
import DeliveryTracking from './pages/DeliveryTracking';
import { SearchResult } from './pages/SearchResult';
import AddProductForm from './pages/AddProductForm';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// https://ecom-project-s6sa.vercel.app/


;

function App() {
  
  return (
    <>


<Router>
    
  <Navbar/>

  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/product-details/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<CartPretected><CartComponent/></CartPretected>} />
  <Route path="/tracking" element={<DeliveryTracking />} />
  <Route path="/cp" element={<ColorPalette/>} />
  <Route path="/search" element={<SearchResult/>} />
  <Route path="/add-product" element={<AddProductForm/>} />
  
  </Routes>
  <Footer/>
</Router>

    </>
  );
}

export default App;
