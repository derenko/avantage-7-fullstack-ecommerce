"use client";

import { cn } from "@/core/utils";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface ArrowButtonProps {
  href?: string;
  direction?: "left" | "right";
  children: React.ReactNode;
}

export function ArrowButton({
  href = "/",
  direction = "left",
  children,
}: ArrowButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const iconClassName = {
    "ml-2": direction === "right",
    "mr-2": direction === "left",
  };

  const icon = isPending ? (
    <Loader2 className={cn("animate-spin", iconClassName)} />
  ) : direction === "left" ? (
    <ArrowLeft className={cn("text-xl", iconClassName)} />
  ) : (
    <ArrowRight className={cn("text-xl", iconClassName)} />
  );

  const handleNavigate = () => {
    startTransition(() => router.push(href));
  };

  return (
    <button
      onClick={handleNavigate}
      className="rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] border border-zinc-300 hover:bg-zinc-200 text-zinc-600 py-3 px-6"
    >
      {direction === "left" && icon}
      {children}
      {direction === "right" && icon}
    </button>
  );
}
