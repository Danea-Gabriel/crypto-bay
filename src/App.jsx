import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinPage from "./routes/CoinPage";

function App() {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en";

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  }, [url]);

  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<Account />} />
        <Route path="/coin/:coinId" element={<CoinPage />}>
          <Route path=":coinId" />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
