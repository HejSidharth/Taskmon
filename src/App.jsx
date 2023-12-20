import { Login } from "./pages/Login";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar1 from "./components/Navbar";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";
import Table from "./pages/Task";
import Footer from "./components/Footer";
import VersionHistory from "./pages/Version";


function App() {
  return (
    <BrowserRouter>
    <Toaster />
    <Navbar1 />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/task" element={<Table />} />
      <Route path="/version" element={<VersionHistory/>} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}


export default App;