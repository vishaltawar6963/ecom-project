import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    deliveryTime: '',
    imageUrl: [''],  // Changed to array with one empty string initially
    countryOfOrigin: '',
    manufacturer: '',
    packer: '',
    importer: '',
    netQuantity: '',
    mrp: '',
    dimensions: '',
    weight: '',
    warranty: '',
    returnPolicy: '',
    seller: '',
    badge: {
      label: '',
      color: '',
    },
    category: '',
    link: '#',
  });

  const badgeColors = {
    Bestseller: 'success',
    Trending: 'warning',
    'New Arrival': 'info',
  };

  const categories = [
    "Electronics",
    "Fashion & Apparel",
    "Beauty & Personal Care",
    "Home & Kitchen",
    "Toys & Gifts / Hobbies",
    "Food & Beverages"
  ];

  // Handle general form changes except imageUrl array
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'badge.label') {
      setFormData((prev) => ({
        ...prev,
        badge: {
          label: value,
          color: badgeColors[value] || '',
        },
      }));
    } else if (name.startsWith('imageUrl')) {
      // imageUrl change handled separately below
      console.log(name)
      const index = Number(name.split('.')[1]);
      const newImageUrls = [...formData.imageUrl];
      newImageUrls[index] = value;
      setFormData((prev) => ({
        ...prev,
        imageUrl: newImageUrls,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new image url input (max 5)
  const addImageInput = () => {
    if (formData.imageUrl.length < 5) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: [...prev.imageUrl, ''],
      }));
    }
  };

  // Remove image url input (min 1)
  const removeImageInput = (index) => {
    if (formData.imageUrl.length > 1) {
      const newImageUrls = formData.imageUrl.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        imageUrl: newImageUrls,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    // Optional: Validate minimum 1 image URL filled
    if (formData.imageUrl.some(url => url.trim() === '')) {
      alert('Please fill all image URL fields or remove empty ones');
      return;
    }

    try {
      await axios.post('https://ecom-project-nktj.onrender.com/api/products', formData);
      alert('✅ Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {[
          'name', 'description', 'price', 'deliveryTime',
          'countryOfOrigin', 'manufacturer', 'packer', 'importer',
          'netQuantity', 'mrp', 'dimensions', 'weight',
          'warranty', 'returnPolicy', 'seller', 'link'
        ].map((field, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'description' ? 'textarea' : 'text'}
              name={field}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Image URLs input fields */}
        <div className="mb-3">
          <label className="form-label">Image URLs (min 1, max 5)</label>
          {formData.imageUrl.map((url, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                name={`imageUrl.${index}`}
                className="form-control"
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeImageInput(index)}
                disabled={formData.imageUrl.length === 1}
                title={formData.imageUrl.length === 1 ? "At least 1 image required" : "Remove this image URL"}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addImageInput}
            disabled={formData.imageUrl.length >= 5}
          >
            Add Image URL
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Badge Label</label>
          <select
            name="badge.label"
            className="form-select"
            value={formData.badge.label}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Bestseller">Bestseller</option>
            <option value="Trending">Trending</option>
            <option value="New Arrival">New Arrival</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Badge Color</label>
          <input
            type="text"
            name="badge.color"
            className="form-control"
            value={formData.badge.color}
            disabled
          />
        </div>

        {/* Category Select */}
        <div className="mb-3">
          <label className="form-label">Select Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
