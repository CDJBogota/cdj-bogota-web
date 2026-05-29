import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import InstitucionalPage from "./pages/InstitucionalPage.jsx";
import NormativaPage from "./pages/NormativaPage.jsx";
import TransparenciaPage from "./pages/TransparenciaPage.jsx";
import ParticipaPage from "./pages/ParticipaPage.jsx";
import LocalidadesPage from "./pages/LocalidadesPage.jsx";
import SistemaJuventudPage from "./pages/SistemaJuventudPage.jsx";
import ComisionesPage from "./pages/ComisionesPage.jsx";
import DocumentosPage from "./pages/DocumentosPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/normativa" element={<NormativaPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="/sistema-juventud" element={<SistemaJuventudPage />} />
        <Route path="/comisiones" element={<ComisionesPage />} />
        <Route path="/documentos" element={<DocumentosPage />} />
        <Route path="/participa" element={<ParticipaPage />} />
        <Route path="/localidades" element={<LocalidadesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
