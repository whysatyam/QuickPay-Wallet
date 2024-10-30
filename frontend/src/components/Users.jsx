import axios from "axios";
import Button from "./Button";
import UserSkeleton from "./UserSkeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=${filter}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setUsers(response.data.user);
        setLoading(false);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">QuickPay Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="search . ."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {loading
          ? 
            Array.from({ length: 5 }).map((_, index) => (
              <UserSkeleton key={index} />
            ))
          : users.map((user, index) => <User key={index} user={user} />)}
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}