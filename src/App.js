import Header from "./components/Starter/Header";
import { Route, Routes } from "react-router-dom";
import CreateAccount from "./components/Create Account/CreateAccount";
import MainApplication from "./components/Main Application/MainApplication";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApplication />} />
      <Route path="/welcome" element={<Header />} />
      <Route path="/signUp" element={<CreateAccount />} />
      <Route path="/mainApplication/*" element={<MainApplication />} />
    </Routes>
  );
}

export default App;
