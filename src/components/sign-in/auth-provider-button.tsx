"use client";

import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Awaitable } from "next-auth";

interface AuthProviderButtonProps {
  provider: { id: string; name: string };
}

export function AuthProviderButton({ provider }: AuthProviderButtonProps) {
  const handleSignIn = async () => {
    await signIn(provider.id);
  };

  return (
    <div className="grid grid-cols-1 gap-6" key={provider.id}>
      <Button className="flex" variant="outline" onClick={handleSignIn}>
        Sign In with
        <span className="ml-2">{provider.name}</span>
      </Button>
    </div>
  );
}
