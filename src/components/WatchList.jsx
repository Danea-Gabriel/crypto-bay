import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const WatchList = () => {
  const [coins, setCoins] = useState([]);
  const user = UserAuth().user;

  useEffect(() => {
    if (user?.email) {
      onSnapshot(doc(firestore, "users", `${user?.email}`), doc => {
        setCoins(doc.data()?.watchList);
      });
    }
  }, [user?.email]);

  const deletePath = doc(firestore, "users", `${user?.email}`);

  const deleteCoin = async (id)=>{
    try{
      const result = coins.filter(coin =>coin.id !== id);
      await updateDoc(deletePath, {
        watchList: result,
      })
    }
    catch(error){
      console.log(error);
    }

  }

  return (
    <div>
      {coins?.length === 0 ? (
        <p>
          No coins saved. Please save a coin to add it to watch list.{" "}
          <Link to="/" className="text-accent">
            Click Here
          </Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bprder-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map(coin => (
              <tr key={coin.id} className="h-[60px] overflow-hidden">
                <td>{coin?.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className="flex items-center">
                      <img className="w-8 mr-4" src={coin?.image} alt="coin" />
                    </div>
                    <div>
                      <p className="hidden sm:table-cell">{coin?.name}</p>
                      <p className="text-gray-500 text-left text-sm">
                        {coin?.symbol.toUpperCase()}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="pl-8">
                  <AiOutlineClose onClick={()=>deleteCoin(coin.id)} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WatchList;
