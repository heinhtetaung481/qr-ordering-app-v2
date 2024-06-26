import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "./Home";
import Tables from "./tables/Tables"
import AddTable from "./tables/AddTable"
import ViewTable from "./tables/ViewTable"
import Menu from "./menus/Menu"
import AddMenu from "./menus/AddMenu";
import Categories from "./categories/Category"
import AddCategory from "./categories/AddCategory"
import AddToCart from "./cart/AddToCart"
import GuestLayout from "../Layout/GuestLayout"
import ViewCart from "./cart/ViewCart"
import Checkout from "./cart/Checkout"
import Order from "./orders/Order"
import Login from "./login/Login"
import { AuthProvider } from "../utils/AuthContext";
import ProtectedRoute from "../utils/ProtectedRoute"; 

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>}>
          
          <Route index element={<Home />} />
          {/* Table Routes */}
          <Route path="/tables" element={<Tables />} />
          <Route path="/tables/create" element={<AddTable />} />
          <Route path="/tables/:id" element={<ViewTable />} />
          <Route path="/tables/edit/:id" element={<AddTable />} />
          {/* Menu Routes */}
          <Route path="/menus" element={<Menu />} />
          <Route path="/menus/create" element={<AddMenu />} />
          <Route path="/menus/edit/:id" element={<AddMenu />} />
          {/* Category Routes */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/create" element={<AddCategory />} />
          <Route path="/orders" element={<Order />} />
        </Route>
        {/* Add to cart routes */}
        <Route path="/cart" element={<GuestLayout />}>
          <Route index element={<AddToCart />} />
          <Route path="/cart/view"  element={<ViewCart />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;