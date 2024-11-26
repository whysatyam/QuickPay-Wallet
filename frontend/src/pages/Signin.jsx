import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";

import { toast } from "react-hot-toast";

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="position absolute top-20">
          <Logo />
        </div>
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="you@example.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                setLoading(true);
                const res = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
                  {
                    username,
                    password,
                  }
                );
                if (res.data.token) {
                  localStorage.setItem("token", res.data.token);
                  toast.success("Logged in successfully");
                  navigate("/dashboard");
                } else {
                  toast.error("Invalid credentials");
                }
                setLoading(false)
              }}
              label={loading ? <Loader /> : "Sign in"}
              loading={loading} 
              disabled={loading}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}