import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MedicineDetails from "./MedicineDetails";
import { MedicineType } from "../types/MedicineType";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<MedicineType[]>([
    {
      id: 1,
      name: "Paracetamol",
      category: "Allopathy",
      price: 50,
      discount: 30,
      imageUrl: "https://example.com/paracetamol.jpg",
      manufacturer: "ABC",
      manufacturingDate: "2024-10-12",
      expiryDate: "2025-10-12",
      stock: 20,
    },
  ]);
  const [cartQuantities, setCartQuantities] = useState<{ [id: number]: number }>(
    { 1: 1 }
  );
  const [message, setMessage] = useState("");

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartQuantities({ ...cartQuantities, [id]: newQuantity });
    setMessage("Quantity updated successfully");
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((medicine) => medicine.id !== id));
    setMessage("Item deleted from cart successfully");
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      ((item.price * (100 - item.discount)) / 100) * cartQuantities[item.id],
    0
  );

  const handleClearCart = () => {
    setCart([]);
    setMessage("All items removed successfully");
  };

  return (
    <Box sx={{ p: 3}}>
      <Box sx={{ display:"flex", justifyContent: "space-between", margin: "20px"}}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#086E7D" }}
          onClick={handleClearCart}
        >
          Remove All Medicines
        </Button>
        <Box sx={{ mb: 2 }}>
          {message && (
            <Typography sx={{ color: "green", fontWeight: "bold" }}>
              {message}
            </Typography>
          )}
        </Box>
        <Typography variant="h6">Subtotal: ₹{subtotal.toFixed(2)}</Typography>
      </Box>
      {cart.length === 0 ? (
        <Box textAlign="center">
          <Typography>Your cart is empty</Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#FAB12F", mt: 2 }}
            onClick={() => console.log("Navigate to Medicines")}
          >
            Go Back
          </Button>
        </Box>
      ) : (
        <>
          <Box>
            {cart.map((medicine) => (
              <MedicineDetails
                key={medicine.id}
                medicine={medicine}
                fromCart={true}
                cartQuantity={cartQuantities[medicine.id]}
                onQuantityChange={handleQuantityChange}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </Box>
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#086E7D", mt: 2, ml: 2 }}
              onClick={() => console.log("Place Order")}
            >
              Place Order
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
