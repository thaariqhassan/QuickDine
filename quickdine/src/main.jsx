import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Home from "./routes/Home";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>,
);
