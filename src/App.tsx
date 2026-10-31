
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import ConsultationPage from "./pages/ConsultationPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import WebDevelopmentPage from "./pages/services/WebDevelopmentPage";
import AutomationPage from "./pages/services/AutomationPage";
import DataAnalysisPage from "./pages/services/DataAnalysisPage";
import Chatbot from "./components/common/Chatbot";
import ServiceCalculator from "./components/common/ServiceCalculator";
import WebsiteGuide from "./components/common/WebsiteGuide";
import { PageTracker } from "./components/common/PageTracker";
import { SmoothScroll } from "./components/common/SmoothScroll";
import { Preloader } from "./components/ui/Preloader";
import { CustomCursor } from "./components/ui/CustomCursor";
import { DarkDocument, PageTransition } from "./components/common/PublicShellEffects";

// Admin imports
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminContentPage from "./pages/admin/AdminContentPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import { PageEditor } from "./components/admin/PageEditor";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes - No NavBar/Footer */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <ProtectedAdminRoute>
                <AdminContentPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/content/pages/:pageId"
            element={
              <ProtectedAdminRoute>
                <PageEditor />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute requireAdmin>
                <AdminUsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettingsPage />
              </ProtectedAdminRoute>
            }
          />

          {/* Public Routes — dark 3D showpiece theme (scoped .dark wrapper; admin stays light) */}
          <Route
            path="/*"
            element={
              <div className="dark">
                <DarkDocument />
                <Preloader />
                <CustomCursor />
                <SmoothScroll>
                  <div className="flex flex-col min-h-screen bg-deep noise-overlay relative">
                    <NavBar />
                    <main className="flex-grow">
                      <PageTransition>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/consultation" element={<ConsultationPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:id" element={<BlogPostPage />} />
                        <Route path="/unsubscribe" element={<UnsubscribePage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
                        <Route path="/services/automation" element={<AutomationPage />} />
                        <Route path="/services/data-analysis" element={<DataAnalysisPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      </PageTransition>
                    </main>
                    <Footer />
                    <Chatbot />
                    <ServiceCalculator />
                    <WebsiteGuide />
                    <PageTracker />
                  </div>
                </SmoothScroll>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
