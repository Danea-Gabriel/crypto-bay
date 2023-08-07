import React from "react";
import SearchInput from "../components/SearchInput";

const Home = ({coins}) => {
  return (
    <div>
      <SearchInput coins={coins}/>
    </div>
  );
};

export default Home;
