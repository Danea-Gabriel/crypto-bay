/* eslint-disable react/prop-types */
import { useState } from "react";

import CoinElement from "./CoinElement";

const SearchInput = ({ coins }) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="rounded-div my-4">
      <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h1 className="text-2xl font-bold my-2">Search Coin</h1>
        <form>
          <input
            onChange={e => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full bg-primary  border-input px-4 py-2 rounded-2xl shadow-xl"
          />
        </form>
      </div>

      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-left">Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className="hidden md:table-cell">24h Volume</th>
            <th className="hidden sm:table-cell">Mkt Cap</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>

        <tbody>
          {coins
            .filter(value => {
              if (searchInput === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return value;
              }
            })
            .map(coin => (
              <CoinElement key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchInput;
