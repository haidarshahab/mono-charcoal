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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/shisha" element={<ShishaCharcoal />} />
          <Route path="/products/bbq" element={<BBQCharcoal />} />
          <Route path="/oem" element={<OEM />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/export" element={<Export />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
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