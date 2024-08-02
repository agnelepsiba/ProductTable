
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  rating: number;
  comment: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  reviews?: Review[];
}

interface ProductsState {
  productList: Product[];
  searchProducts: Product[];
  selectedProduct: Product | null;
  productReviews: Review[];
}

const initialState: ProductsState = {
  productList: [],
  searchProducts: [],
  selectedProduct: null,
  productReviews: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },
    setSearchProducts: (state, action: PayloadAction<Product[]>) => {
      state.searchProducts = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setProductReviews: (state, action: PayloadAction<Review[]>) => {
      state.productReviews = action.payload;
    },
  },
});

export const { setProductList, setSearchProducts, setSelectedProduct, setProductReviews } = productSlice.actions;

export default productSlice.reducer;
