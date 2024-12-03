export interface MedicineType {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  manufacturingDate: string;
  expiryDate: string;
  stock: number;
  price: number;
  discount: number; // Percentage discount
  imageUrl: string;
  }
