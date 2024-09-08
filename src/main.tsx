import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import OrderProvider from "./contexts/OrderProvider.tsx";
import ShoppingContextProvider from "./contexts/ShoppingProvider.tsx";
import "./index.css";
import { store } from "./state/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <Provider store={store}>
          <ShoppingContextProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </ShoppingContextProvider>
        </Provider>
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
