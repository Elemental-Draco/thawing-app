import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import SupervisorRoutes from "./SupervisorRoutes";
import ThawedBoh from "./pages/ThawedBoh";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route>
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
          <Route element={<SupervisorRoutes />}>
            <Route path="thawed-boh" element={<ThawedBoh />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
