import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // optional if you want styles

// Mount React App into index.html (#root)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

