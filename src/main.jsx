import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
      <Toaster
        // position="top-right"
        toastOptions={{
          position:'center',
          duration:2000,
          success: {
            style: { background: "#4CAF50", color: "white" },
          },
          error: {
            style: { background: "#f44336", color: "white" },
          },
        }}
      />
    </Provider>
);
