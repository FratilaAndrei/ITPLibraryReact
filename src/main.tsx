import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import OrderProvider from "./contexts/OrderProvider.tsx";
import ShoppingContextProvider from "./contexts/ShoppingContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <ShoppingContextProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ShoppingContextProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
