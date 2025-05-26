import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const fallbackImage =
  'https://via.placeholder.com/300?text=Image+Not+Available'; // fallback image

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState('');

  const [similarProducts, setsimilarProducts] = useState([
    {
      id: '1',
      title: 'Personalized LED Photo Frame',
      price: 899,
      mrp: 1299,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: '2',
      title: 'Customizable Wooden Lamp',
      price: 1099,
      mrp: 1499,
      image:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: '3',
      title: 'Heart-Shaped LED Frame',
      price: 799,
      mrp: 999,
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: '4',
      title: 'Rotating Photo Lamp',
      price: 1199,
      mrp: 1599,
      image:
        'https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?w=600&auto=format&fit=crop&q=60',
    },
  ]);

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} of ${product.title}`);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(
        `https://ecom-project-nktj.onrender.com/api/products/${productId}`
      );
      const productData = response.data;
      setProduct(productData);

      if (Array.isArray(productData.imageUrl)) {
        setMainImage(productData.imageUrl[0]);
      } else {
        setMainImage(productData.imageUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  return (
    <div className="container mt-5">
      <style>
        {`
          .zoom-image {
            transition: transform 0.3s ease;
          }
          .zoom-image:hover {
            transform: scale(1.05);
          }
          .thumbnail {
            transition: border 0.3s ease;
          }
        `}
      </style>

      <div className="row">
        {/* Left Side: Product Image */}
        <div className="col-md-5">
          {mainImage && (
            <div
              style={{
                width: '100%',
                paddingTop: '100%',
                position: 'relative',
                marginBottom: '1rem',
              }}
            >
              <img
                src={mainImage}
                alt={product.title}
                onError={(e) => (e.target.src = fallbackImage)}
                className="zoom-image"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.25rem',
                }}
              />
            </div>
          )}

          {Array.isArray(product.imageUrl) && product.imageUrl.length > 1 && (
            <div className="d-flex flex-wrap gap-2">
              {product.imageUrl.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  onError={(e) => (e.target.src = fallbackImage)}
                  className="rounded thumbnail"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: mainImage === img ? '2px solid #007bff' : '1px solid #ccc',
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

      {/* Right Side: Product Details */}
<div className="col-md-7 mt-3" style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
  <div style={{ overflowY: 'auto', flex: 1, paddingRight: '1rem' }}>
    <h2>{product.name}</h2>
    <p className="text-muted">{product.description}</p>
    <h4 className="text-primary">₹{product.price}</h4>

    <p className="mb-1">
      <strong>MRP:</strong>{' '}
      <span className="text-decoration-line-through text-muted">₹{product.mrp}</span>
    </p>
    <p className="mb-2">
      <strong>You Save:</strong>{' '}
      <span className="text-success">
        ₹{(product.mrp - product.price).toFixed(2)} (
        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)
      </span>
    </p>

    <p>
      <strong>Delivery by:</strong> {product.deliveryTime}
    </p>

    <div className="mb-3">
      <label htmlFor="quantity" className="form-label">
        Quantity:
      </label>
      <input
        type="number"
        id="quantity"
        className="form-control w-25"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
    </div>

    <div className="d-flex mb-3">
      <button className="btn btn-primary me-2" onClick={handleBuyNow}>
        Buy Now
      </button>
      <button className="btn btn-outline-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>

    <div className="mt-4">
      <h5>Product Details</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Country of Origin:</strong> {product.countryOfOrigin}
        </li>
        <li className="list-group-item">
          <strong>Manufacturer:</strong> {product.manufacturer}
        </li>
        <li className="list-group-item">
          <strong>Packer:</strong> {product.packer}
        </li>
        <li className="list-group-item">
          <strong>Importer:</strong> {product.importer}
        </li>
        <li className="list-group-item">
          <strong>Net Quantity:</strong> {product.netQuantity}
        </li>
        <li className="list-group-item">
          <strong>MRP:</strong> ₹{product.mrp}
        </li>
        <li className="list-group-item">
          <strong>Dimensions:</strong> {product.dimensions}
        </li>
        <li className="list-group-item">
          <strong>Weight:</strong> {product.weight}
        </li>
        <li className="list-group-item">
          <strong>Warranty:</strong> {product.warranty}
        </li>
        <li className="list-group-item">
          <strong>Return Policy:</strong> {product.returnPolicy}
        </li>
        <li className="list-group-item">
          <strong>Seller:</strong> {product.seller}
        </li>
      </ul>
    </div>
  </div>
</div>

      </div>

      {/* Similar Products Section */}
      <div className="container mt-5">
        <h4 className="mb-4">Similar Products</h4>
        <div className="row">
          {similarProducts.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className="card h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => (e.target.src = fallbackImage)}
                  className="card-img-top"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text text-success mb-1">₹{item.price}</p>
                  <p className="card-text text-muted text-decoration-line-through mb-1">
                    ₹{item.mrp}
                  </p>
                  <p className="card-text text-success mb-2" style={{ fontSize: '0.85rem' }}>
                    {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                  </p>
                  <button className="btn btn-sm btn-outline-primary mt-auto">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
