import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl w-full grid sm:grid-cols-2  grid-cols-1 gap-2 mt-16">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-[270px]" />
      ))}
    </div>
  );
}
