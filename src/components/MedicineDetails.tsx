import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface MedicineDetailsProps {
  medicine: {
    id: number;
    name: string;
    category: string;
    manufacturer: string;
    manufacturingDate: string;
    expiryDate: string;
    stock: number;
    price: number;
    discount: number;
    imageUrl: string;
  };
  fromCart: boolean;
  cartQuantity?: number;
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemoveFromCart?: (id: number) => void;
  onAddToCart?: () => void;
}

const MedicineDetails: React.FC<MedicineDetailsProps> = ({
  medicine,
  fromCart,
  cartQuantity = 0,
  onQuantityChange,
  onRemoveFromCart,
  onAddToCart,
}) => {
  const [isAddedToCart, setAddedToCart] = useState(false)
  const discountedPrice = (medicine.price * (100 - medicine.discount)) / 100;

  const handleIncrement = () => {
    if (onQuantityChange) onQuantityChange(medicine.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1 && onQuantityChange)
      onQuantityChange(medicine.id, cartQuantity - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        p: 2,
        borderRadius: 2,
      }}
    >
      {/* Medicine Image */}
      <Box>
        <img
          src={medicine.imageUrl}
          alt={medicine.name}
          style={{ width: "100px", height: "100px", borderRadius: "8px" }}
        />
      </Box>

      {/* Details */}
      <Box sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h5">{medicine.name}</Typography>
          <Typography>Category: {medicine.category}</Typography>
          <Typography>Manufacturer: {medicine.manufacturer}</Typography>
          <Typography>Manufacturing Date: {medicine.manufacturingDate}</Typography>
          <Typography>Expiry Date: {medicine.expiryDate}</Typography>

        {fromCart ? (
          <Box>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleDecrement} disabled={cartQuantity <= 1}>
                <RemoveIcon />
              </IconButton>
              <Typography>{cartQuantity}</Typography>
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="text"
              sx={{ bgcolor: "#086E7D", mt: 2, color: "#FFFFFF"}}
              onClick={() => onRemoveFromCart && onRemoveFromCart(medicine.id)}
            >
              Remove
            </Button>
          </Box>
        ) : isAddedToCart ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
              gap: 1,
              bgcolor: '#fff',
              color: '#086E7D',
              borderRadius: '4px',
              p: 0.5,
            }}
          >
            <IconButton
              onClick={handleDecrement}
              sx={{ color: '#086E7D', border: '1px solid #086E7D' }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ width: '30px', textAlign: 'center' }}>{cartQuantity}</Typography>
            <IconButton
              onClick={handleIncrement}
              sx={{ color: '#086E7D', border: '1px solid #086E7D' }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: '#086E7D',
              ':hover': { bgcolor: '#06595A' },
            }}
            onClick={onAddToCart}
            disabled={medicine.stock === 0}
          >
            Add to Cart
          </Button>
        )}
      </Box>
      {/* Pricing */}
      <Box sx={{ textAlign: "right" }}>
        <Typography>₹{discountedPrice.toFixed(2)}</Typography>
        {!fromCart && (
          <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
            ₹{medicine.price.toFixed(2)}
          </Typography>
        )}
        {fromCart && (
          <Typography>
            ₹{discountedPrice} x {cartQuantity} = ₹
            {(discountedPrice * cartQuantity).toFixed(2)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MedicineDetails;
