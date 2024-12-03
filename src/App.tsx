import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Medicines from './components/Medicines';
// import MedicineDetails from './components/MedicineDetails';
import Cart from './components/Cart';
// import Profile from './components/Profile';
// import Orders from './components/Orders';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
