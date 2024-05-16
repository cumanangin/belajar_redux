import { Routes, Route } from "react-router-dom";
import Layout from "./app/components/Layout";
import Public from "./app/components/Public";
import Login from "../src/features/auth/Login";
import LandingPage from "./features/auth/LandingPage";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

      {/* public routes */}
      <Route index element={<Public />} />
      <Route path="login" element={<Login />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="welcome" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
