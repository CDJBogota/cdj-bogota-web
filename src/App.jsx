import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingPqrs from "./components/FloatingPqrs";
import ScrollToHash from "./components/ScrollToHash";

import HomePage from "./pages/HomePage";
import InstitucionalPage from "./pages/InstitucionalPage";
import NormativaPage from "./pages/NormativaPage";
import TransparenciaPage from "./pages/TransparenciaPage";
import DocumentosPage from "./pages/DocumentosPage";
import ParticipaPage from "./pages/ParticipaPage";
import LocalidadesPage from "./pages/LocalidadesPage";
import SistemaJuventudPage from "./pages/SistemaJuventudPage";
import ComisionesPage from "./pages/ComisionesPage";
import IntegrantesPage from "./pages/IntegrantesPage";
import CumplimientoPage from "./pages/CumplimientoPage";
import MapaTerritorialPage from "./pages/MapaTerritorialPage";
import TimelinePage from "./pages/TimelinePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/normativa" element={<NormativaPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="/documentos" element={<DocumentosPage />} />
        <Route path="/participa" element={<ParticipaPage />} />
        <Route path="/localidades" element={<LocalidadesPage />} />
        <Route path="/sistema-juventud" element={<SistemaJuventudPage />} />
        <Route path="/comisiones" element={<ComisionesPage />} />
        <Route path="/integrantes" element={<IntegrantesPage />} />
        <Route path="/cumplimiento" element={<CumplimientoPage />} />
        <Route path="/mapa-territorial" element={<MapaTerritorialPage />} />
        <Route path="/historia" element={<TimelinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <FloatingPqrs />
    </BrowserRouter>
  );
}
