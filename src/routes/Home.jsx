import React from "react";
import SearchInput from "../components/SearchInput";
import TrendingCoins from "../components/TrendingCoins";

const Home = ({coins}) => {
  return (
    <div>
      <SearchInput coins={coins}/>
      <TrendingCoins />
    </div>
  );
};

export default Home;
