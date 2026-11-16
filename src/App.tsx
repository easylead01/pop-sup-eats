import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductImageProvider } from "@/components/ProductImageProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** Сайт живёт в подпапке /pop-sup-eats/ на GitHub Pages */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ProductImageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              {/* Своя ссылка у товара: /sets/set-filadelfiya — меню с открытым окном товара */}
              <Route path="/:category/:slug" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProductImageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
