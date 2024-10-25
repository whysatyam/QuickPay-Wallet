import axios from "axios";
import { useEffect, useState } from "react";

import Users from "../components/Users";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get(
        `${import.meta.env.BACKEND_URL}/api/v1/account/balance`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, [balance]);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}
