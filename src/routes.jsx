import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Map from "./components/Map.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    errorElement: <div>Page not found</div>,
    children: [
      { index: true, element: <Home /> }, // default child
      { path: "home", element: <Home /> },
      { path: "map", element: <Map /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default router;
