// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import LandingPage from "./pages/LandingPage";
import AdDetailPage from "./pages/AdDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PostAdvertPage from "./pages/PostAdvertPage";
import ManageAdvertsPage from "./pages/ManageAdvertsPage";
import EditAdvertPage from "./pages/EditAdvertPage";
import AdApprovalPage from "./pages/AdApprovalPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const adifyRouter = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/ad/:id", element: <AdDetailPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/user-dashboard", element: <UserDashboard /> },
  { path: "/vendor-dashboard", element: <VendorDashboard /> },
  { path: "/admin-dashboard", element: <AdminDashboard /> },
  { path: "/post-advert", element: <PostAdvertPage /> },
  { path: "/manage-adverts", element: <ManageAdvertsPage /> },
  { path: "/edit-advert/:id", element: <EditAdvertPage /> },
  { path: "/ad-approval", element: <AdApprovalPage /> },
  { path: "/contact", element: <ContactUsPage /> },
  { path: "/terms", element: <TermsAndConditionsPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default function App() {
  return(
    <ThemeProvider>
    <AuthProvider> 
    <RouterProvider router={adifyRouter} />
    </AuthProvider>
    </ThemeProvider>
  );
  
}
