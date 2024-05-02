import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "./Home";
import Tables from "./tables/Tables"
import AddTable from "./tables/AddTable"
import ViewTable from "./tables/ViewTable"

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/create" element={<AddTable />} />
        <Route path="/tables/:id" element={<ViewTable />} />
        <Route path="/tables/edit/:id" element={<AddTable />} />
        {/* <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} /> */}
      </Routes>
    </Layout>
  )
}

export default App;