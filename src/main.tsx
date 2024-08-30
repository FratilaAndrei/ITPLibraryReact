import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import FormProvider from "./contexts/FormProvider.tsx";
import ShoppingContextProvider from "./contexts/ShoppingContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <FormProvider>
          <ShoppingContextProvider>
            <App />
          </ShoppingContextProvider>
        </FormProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
