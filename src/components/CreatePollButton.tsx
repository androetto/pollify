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
      className="cursor-pointer bg-[var(--color-foreground)] text-[var(--color-foreground-light)] py-3 px-6 rounded-full text-xl font-semibold "
    >
      Comenzar ahora
    </button>
  );
}
