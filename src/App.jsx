import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import InstitucionalPage from "./pages/InstitucionalPage.jsx";
import NormativaPage from "./pages/NormativaPage.jsx";
import TransparenciaPage from "./pages/TransparenciaPage.jsx";
import ParticipaPage from "./pages/ParticipaPage.jsx";
import LocalidadesPage from "./pages/LocalidadesPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/normativa" element={<NormativaPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="/participa" element={<ParticipaPage />} />
        <Route path="/localidades" element={<LocalidadesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
