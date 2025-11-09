import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./components/Home.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Map = lazy(() => import("./components/Map.jsx"));
const Bookings = lazy(() => import("./components/Bookings.jsx"));
const FindMyMate = lazy(() => import("./components/FindMyMate.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));
const AdminBookings = lazy(() => import("./components/AdminBookings.jsx"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <div>Page not found</div>,
    children: [
      { index: true, element: <Suspense><Navigate to="/home" replace /></Suspense> },
      { path: "home", element: <Suspense><Home /></Suspense> },
      { path: "map", element: <Suspense><Map /></Suspense> },
      { path: "bookings", element: <Suspense><Bookings /></Suspense> },
      { path: "admin/bookings", element: <Suspense><AdminBookings /></Suspense> },
      { path: "admin/register", element: <Suspense><Register /></Suspense> },
      { path: "find-mate", element: <Suspense><FindMyMate /></Suspense> },
      { path: "settings", element: <div className="p-8"><h1 className="text-3xl font-bold">Settings - Coming Soon</h1></div> },
    ],
  },
]);

export default router;
