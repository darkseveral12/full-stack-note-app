import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./Root.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { Provider } from "./components/ui/provider.tsx";

import AuthProvider from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
