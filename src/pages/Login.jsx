import { useState } from "react";
import { useUser as useee } from "../lib/context/user";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";

export function Login() {
  const user = useee();
  const user2 = useUser()
  const userId = user2?.user?.id;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
      <section className="">
      <SignInButton />
      <SignUpButton />
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
  </div>
</section>
  );
}

export default Login;
