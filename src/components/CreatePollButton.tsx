"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePollButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      signIn("google", { callbackUrl: "/create" });
    } else {
      router.push("/create");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer btn-accent text-white py-3 px-8 rounded-full text-xl font-semibold shadow-sm transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      Comenzar ahora
    </button>
  );
}
