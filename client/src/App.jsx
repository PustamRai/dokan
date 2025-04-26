import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./components/SignUp";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import { ProductProvider } from "./context/productContext";
import { CartProvider } from "./context/cartContext";
import SearchResult from "./pages/SearchResult";


// admin import
import {
  AdminLayout,
  AdminLogin,
  Dashboard,
  AddProduct,
  ProductList,
  OrderLists,
  ProtectedRoute,
  Unathorized,
} from "./admin";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/unauthorized" element={<Unathorized />} />

                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route
                    path="/product/:productId"
                    element={<SingleProduct />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/place-order" element={<PlaceOrder />} />
                  <Route path="/orders" element={<Orders />} />

                  {/* search result route */}
                  <Route path="/search" element={<SearchResult />} />
                </Route>

                {/* protect admin routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="add-products" element={<AddProduct />} />
                  <Route path="list" element={<ProductList />} />
                  <Route path="orders" element={<OrderLists />} />
                </Route>
              </Routes>
            </Router>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
