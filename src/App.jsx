import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import TestPage from "./pages/TestPage";
import StartPage from "./pages/StartPage";
import ListPacients from "./pages/ListPacients";
import Dashboard from "./pages/Dashboard";
import CereriPacienti from "./pages/CereriPacienti";
import PacientDetails from "./pages/PacientDetails";
import Recomandari from "./pages/Recomandari";
// import { Modal } from "@mui/material";
import Account from "./pages/Account";

// Modal.setAppElement("#root");

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pacients" element={<ListPacients />} />
        <Route path="/pacients/requests" element={<CereriPacienti />} />
        <Route path="/pacients/details/id" element={<PacientDetails />} />
        <Route path="/pacients/recommandations/id" element={<Recomandari />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
