import axios from "axios";
import { useEffect, useState } from "react";

import Users from "../components/Users";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBalance(res.data.balance);
      setLoading(false);
    };
    fetchBalance();
  }, [balance]);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} loading={loading} />
        <Users />
      </div>
    </div>
  );
}
