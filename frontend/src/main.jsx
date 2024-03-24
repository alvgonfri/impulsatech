import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const sharethis = document.createElement("script");
sharethis.src =
    "https://platform-api.sharethis.com/js/sharethis.js#property=6600abb588484200124fca4e&product=inline-share-buttons&source=platform";
sharethis.async = true;
document.head.appendChild(sharethis);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
