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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/news/:id",
    element: <NewsDetailPage />,
  },
  {
    path: "/activity",
    element: <ActivityPage />,
  },
  {
    path: "/activity/:id",
    element: <ActivityDetailPage />,
  },
  {
    path: "/crossfunction",
    element: <CrossfunctionPage />,
  },
  {
    path: "/crossfunction/:id",
    element: <CrossfunctionDetailPage />,
  },
  {
    path: "/hr",
    element: <HRPage />,
  },
  {
    path: "/my-content",
    element: <MyContentPage />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
