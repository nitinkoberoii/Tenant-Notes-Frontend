import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TenantRegistration from './pages/tenant-registration';
import Login from './pages/login';
import NotesManagement from './pages/notes-management';
import SubscriptionManagement from './pages/subscription-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/tenant-registration" element={<TenantRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes-management" element={<NotesManagement />} />
        <Route path="/subscription-management" element={<SubscriptionManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
