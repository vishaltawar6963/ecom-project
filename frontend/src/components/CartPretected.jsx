import { Navigate } from 'react-router-dom';

const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};
const CartPretected = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />; // or open login modal
  }

  return children;
};

export default CartPretected;