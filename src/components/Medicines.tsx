import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { MedicineType } from "../types/MedicineType";
import { CartItem } from "../types/CartItem";
import { SelectChangeEvent } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MedicineDetails from "./MedicineDetails";

const categories = [
  "Allopathy",
  "Homeopathy",
  "Ayush",
  "Covid Essentials",
  "Fitness",
  "Diabetes",
  "Veterinary",
  "Mom & Baby",
];

const MedicineComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState<MedicineType[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<MedicineType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [medinceToShow, setMedinceToShow] = useState<MedicineType | null>(null);
  const [sortOption, setSortOption] = useState<string>("name-asc");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchMedicines = async () => {
    const fetchedMedicines: MedicineType[] = [
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
    ];
    setMedicines(fetchedMedicines);
  };

  const fetchCartItems = () => {
    const cartItems: CartItem[] = [
      {
        id: 1,
        quantity: 1
      }
    ]
    //api call to fetch the cart items
    setCartItems(cartItems)
  }
  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);



  const debouncedSearch = debounce((query: string) => {
    if (query.trim() === "") {
      setFilteredMedicines([]);
      return;
    }
    const filteredSuggestions = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMedicines(filteredSuggestions);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value as string);
  };

  const navigateToDetails = (medicine: MedicineType) => {
    console.log("m", medicine)
    setMedinceToShow(medicine)
  };

  const goBack = () => {
    setMedinceToShow(null)
  };

  const sortedMedicines = filteredMedicines.length ? filteredMedicines : medicines;

  const sortMedicines = (medicines: MedicineType[]) => {
    return medicines.sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      }
      if (sortOption === "price-desc") {
        return b.price - a.price;
      }
      if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  };

  const handleCategoryFilter = (medicines: MedicineType[]) => {
    if (!selectedCategory) return medicines;
    return medicines.filter((medicine) => medicine.category === selectedCategory);
  };

  const handleAddToCart = (cartItem : CartItem) => {
    setCartItems([...cartItems, cartItem]);
  }

  const finalMedicines = sortMedicines(handleCategoryFilter(sortedMedicines));

  // const state = location.state;

  return (
    <Box sx={{ padding: 3 }}>
      {/* If we are on the details page, display the details of the medicine */}
      {medinceToShow ? (
        <>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#086E7D", color: "white", marginBottom: "20px" }}
            onClick={goBack}
          >
            Back to List
          </Button>
          <MedicineDetails
            medicine={medinceToShow}
            fromCart={false}
            cartQuantity={cartItems.find(item => item.id === medinceToShow.id)?.quantity}
          />
        </>
      ) : (
        <>
          {/* Search and Sort Section */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            <TextField
              label="Search Medicines"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: 800, marginRight: 1 }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#468B97", color: "white" }}
            >
              Search
            </Button>
            <FormControl sx={{ marginLeft: 2 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={handleSortChange} label="Sort By">
                <MenuItem value="price-asc">Price Low to High</MenuItem>
                <MenuItem value="price-desc">Price High to Low</MenuItem>
                <MenuItem value="name-asc">A-Z</MenuItem>
                <MenuItem value="name-desc">Z-A</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Categories Section */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outlined"
                sx={{
                  margin: 1,
                  backgroundColor: selectedCategory === category ? "#468B97" : "white",
                  color: selectedCategory === category ? "white" : "black",
                }}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </Box>

          {/* Medicines List */}
          <Grid container spacing={3}>
            {finalMedicines.map((medicine) => (
              <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "#086E7D",
                      color: "white",
                      padding: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => navigateToDetails(medicine)}
                  >
                    {medicine.name}
                  </Typography>
                  <img
                    src={medicine.imageUrl}
                    alt={medicine.name}
                    width={150}
                    height={150}
                  />
                  <Typography sx={{ fontWeight: "bold", marginTop: 1 }}>
                    ₹{medicine.price}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default MedicineComponent;
