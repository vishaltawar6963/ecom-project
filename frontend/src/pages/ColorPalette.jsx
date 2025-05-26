import React from "react";

const colors = {
  Primary: "#6A1B9A",    // Purple
  Secondary: "#FF7043",  // Soft Orange
  Accent: "#FFD54F",     // Light Yellow
  Neutral: "#FAFAFA",    // Very Light Gray
  Text: "#263238",       // Almost Black
};

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99",
    description: "High-quality sound with noise cancellation.",
    image: "https://via.placeholder.com/200?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199",
    description: "Track your fitness and notifications.",
    image: "https://via.placeholder.com/200?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: "$49",
    description: "Portable and powerful sound.",
    image: "https://via.placeholder.com/200?text=Speaker",
  },
];

const Navbar = () => (
  <nav
    style={{
      backgroundColor: colors.Primary,
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "20px",
    }}
  >
    <div>E-Shop</div>
    <div>
      <button
        style={{
          backgroundColor: colors.Secondary,
          border: "none",
          padding: "8px 16px",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Cart
      </button>
    </div>
  </nav>
);

const ProductCard = ({ product }) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      padding: "15px",
      width: "250px",
      textAlign: "center",
      color: colors.Text,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <img
      src={product.image}
      alt={product.name}
      style={{ borderRadius: "10px", marginBottom: "15px" }}
    />
    <h3 style={{ margin: "5px 0" }}>{product.name}</h3>
    <p style={{ fontSize: "14px", color: "#555", flexGrow: 1 }}>
      {product.description}
    </p>
    <div style={{ margin: "15px 0", fontWeight: "bold", fontSize: "18px" }}>
      {product.price}
    </div>
    <button
      style={{
        backgroundColor: colors.Secondary,
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF5722")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = colors.Secondary)}
    >
      Add to Cart
    </button>
  </div>
);

const Footer = () => (
  <footer
    style={{
      backgroundColor: colors.Primary,
      color: "white",
      textAlign: "center",
      padding: "20px",
      marginTop: "40px",
    }}
  >
    &copy; 2025 E-Shop. All rights reserved.
  </footer>
);


const ColorPalette = () => {
  return (
  <div style={{ backgroundColor: colors.Neutral, minHeight: "100vh" }}>
      <Navbar />
      <header style={{ padding: "40px 30px", textAlign: "center", color: colors.Text }}>
        <h1>Welcome to E-Shop</h1>
        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "10px auto" }}>
          Find the best electronics and accessories at unbeatable prices!
        </p>
      </header>
      <main
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "0 30px 40px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ColorPalette;
