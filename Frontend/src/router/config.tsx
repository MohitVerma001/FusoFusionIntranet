import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import NewsPage from "../pages/news/page";
import NewsDetailPage from "../pages/news/detail/page";
import ActivityPage from "../pages/activity/page";
import ActivityDetailPage from "../pages/activity/detail/page";
import CrossfunctionPage from "../pages/crossfunction/page";
import CrossfunctionDetailPage from "../pages/crossfunction/detail/page";
import AdminPanel from "../pages/admin/page";
import HRPage from "../pages/hr/page";
import MyContentPage from "../pages/my-content/page";
import LoginPage from "@/pages/login/page";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/news",
    element: (
      <ProtectedRoute>
        <NewsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/news/:id",
    element: (
      <ProtectedRoute>
        <NewsDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity",
    element: (
      <ProtectedRoute>
        <ActivityPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity/:id",
    element: (
      <ProtectedRoute>
        <ActivityDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/crossfunction",
    element: (
      <ProtectedRoute>
        <CrossfunctionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/crossfunction/:id",
    element: (
      <ProtectedRoute>
        <CrossfunctionDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hr",
    element: (
      <ProtectedRoute>
        <HRPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-content",
    element: (
      <ProtectedRoute>
        <MyContentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
