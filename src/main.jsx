import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/protectedroute.jsx";
import Notes from "./pages/Notes.jsx";
import Create from "./pages/Create.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
       },
      {
        path: "notes",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <Notes /> }],
      },
      {path:"create", element : <ProtectedRoute/>, children:[{path:"", element:<Create/>}]}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
