import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ShishaCharcoal from "./pages/ShishaCharcoal";
import BBQCharcoal from "./pages/BBQCharcoal";
import OEM from "./pages/OEM";
import Quality from "./pages/Quality";
import Export from "./pages/Export";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticles from "./pages/AdminArticles";
import AdminArticleEdit from "./pages/AdminArticleEdit";
import AdminContacts from "./pages/AdminContacts";
import AdminSubscribers from "./pages/AdminSubscribers";

const queryClient = new QueryClient();

// Multi-language route groups - shared component for all languages
const pageRoutes = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/products", element: <Products /> },
  { path: "/products/shisha", element: <ShishaCharcoal /> },
  { path: "/products/bbq", element: <BBQCharcoal /> },
  { path: "/oem", element: <OEM /> },
  { path: "/quality", element: <Quality /> },
  { path: "/export", element: <Export /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/contact", element: <Contact /> },
];

// Language prefixes (excluding 'en' which uses root)
const langPrefixes = ['ar', 'de', 'fr', 'tr', 'ru', 'ja'];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* Default English routes (no prefix) */}
          {pageRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          
          {/* Language-prefixed routes */}
          {langPrefixes.map(prefix => (
            pageRoutes.map(route => (
              <Route 
                key={`${prefix}${route.path}`} 
                path={`${prefix}${route.path === '/' ? '' : route.path}`} 
                element={route.element} 
              />
            ))
          ))}
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/articles/new" element={<AdminArticleEdit />} />
          <Route path="/admin/articles/:id" element={<AdminArticleEdit />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/subscribers" element={<AdminSubscribers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;