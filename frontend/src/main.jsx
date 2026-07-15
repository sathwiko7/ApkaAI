import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { StatsProvider } from "./context/StatsContext";
import { ActivityProvider } from "./context/ActivityContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatsProvider>
      <ActivityProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
            },
          }}
        />

        <App />

      </ActivityProvider>
    </StatsProvider>
  </React.StrictMode>
);