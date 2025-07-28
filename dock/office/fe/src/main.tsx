// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/css/reset.css";
import "./assets/scss/global.scss";
import { SnackbarProvider } from "notistack";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@/assets/js/amfe-flexible.js";
// import "@/assets/scss/index.scss";
import Root from "@/features/Root.tsx";
import Home from "./features/Home/index.tsx";
import About from "./features/About/index.tsx";
import Office from "./features/Office/index.tsx";
import PDF2WORD from "./features/Office/pdf2word.tsx";
import MergePDF from "./features/Office/mergePDF.tsx";
import "@/utils/polyfill/crypto-randomuuid.ts";
import IMG2PDF from "./features/Office/img2pdf.tsx";
import SPLITPDF from "./features/Office/splitPDF.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },

      // {
      //   path: "office",
      //   Component: Office,
      //   children: [{ index: true, Component: PDF }]
      // },
      {
        path: "pdf-to-word",
        Component: Office,
        children: [{ index: true, Component: PDF2WORD }]
      },
      {
        path: "merge-pdf",
        Component: Office,
        children: [{ index: true, Component: MergePDF }]
      },
      {
        path: "image-to-pdf",
        Component: Office,
        children: [{ index: true, Component: IMG2PDF }]
      },
      {
        path: "split-pdf",
        Component: Office,
        children: [{ index: true, Component: SPLITPDF }]
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={4000}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
  >
    <RouterProvider router={router} />
  </SnackbarProvider>
);
