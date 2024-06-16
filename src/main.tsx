import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.tsx"; // Assuming your routes are defined in a separate file
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        {/* <App /> */}
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
