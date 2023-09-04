import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl w-full mt-[100px]">
      <Skeleton className="w-full mt-8 h-[270px]" />
      <Skeleton className="w-full mt-8 h-[270px]" />
    </div>
  );
}
