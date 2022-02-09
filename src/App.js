import Header from "./components/Starter/Header";
import { Route, Routes } from "react-router-dom";
import CreateAccount from "./components/Create Account/CreateAccount";
import TradingPlatform from "./components/MainApplication/TradingPlatform";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TradingPlatform />} />
      <Route path="/welcome" element={<Header />} />
      <Route path="/signUp" element={<CreateAccount />} />
      <Route path="/tradingPlatform/*" element={<TradingPlatform />} />
    </Routes>
  );
}

export default App;
