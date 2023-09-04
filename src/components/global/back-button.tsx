import { ArrowButton } from "./arrow-button";

interface BackButtonProps {
  href?: string;
}

export function BackButton({ href = "/" }: BackButtonProps) {
  return (
    <>
      <div className="ml-5 my-3">
        <ArrowButton href={href} direction="left">
          Back
        </ArrowButton>
      </div>
      <div className="sm:mx-3 mx-1 px-2 border-b border-zinc-300" />
    </>
  );
}
