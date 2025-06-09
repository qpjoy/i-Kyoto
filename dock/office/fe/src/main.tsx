// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/css/reset.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import "amfe-flexible";
import Root from "@/features/Root.tsx";
import Home from "./features/Home/index.tsx";
import About from "./features/About/index.tsx";
import Office from "./features/Office/index.tsx";
import PDF from "./features/Office/pdf.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },

      {
        path: "office",
        Component: Office,
        children: [{ index: true, Component: PDF }]
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
