import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-screen">
      <div className="mx-auto w-[900px] mt-[90px]">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="mt-4 h-[165px] w-[900px]" />
        ))}
      </div>
    </div>
  );
}
