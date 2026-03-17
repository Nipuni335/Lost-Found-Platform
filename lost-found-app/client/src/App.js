import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import BrowseItems from "./pages/BrowseItems";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <Router>
      <div>
        <h1>Lost & Found Platform</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lost" element={<ReportLost />} />
          <Route path="/found" element={<ReportFound />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//cd lost-found-app
//cd client
//npm start