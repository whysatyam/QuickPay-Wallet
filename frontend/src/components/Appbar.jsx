import Button from "./Button";
import AppbarLogo from './AppbarLogo'
import { useNavigate } from "react-router-dom";

export default function Appbar () {
  const navigate = useNavigate();
  return (
    <div className="shadow h-14 flex justify-between bg-slate-200">
      <div className="flex flex-col justify-center h-full ml-4">
        <AppbarLogo />
      </div>
      <div className="flex">
        <div className="hidden md:flex flex-col justify-center h-full mr-4">
          Welcome User
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
        <div className="flex mt-2 justify-center items-center">
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            label={"Signout"}
          />
        </div>
      </div>
    </div>
  );
}
