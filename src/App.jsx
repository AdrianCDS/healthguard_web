import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import TestPage from "./pages/TestPage";
import StartPage from "./pages/StartPage";
import ListaPacienti from "./pages/ListaPacienti";
import DashboardDoctor from "./pages/DashboardDoctor";
import CereriPacienti from "./pages/CereriPacienti";
import DetaliiPacient from "./pages/DetaliiPacient";
import Recomandari from "./pages/Recomandari";
import { Modal } from "@mui/material";
import ContDoctor from "./pages/ContDoctor";

//Modal.setAppElement("#root");

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/listapacienti" element={<ListaPacienti />} />
        <Route path="/dashboard" element={<DashboardDoctor />} />
        <Route path="/cereripacienti" element={<CereriPacienti />} />
        <Route path="/detaliipacient" element={<DetaliiPacient />} />
        <Route path="/recomandari" element={<Recomandari />} />
        <Route path="/detaliicont" element={<ContDoctor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
