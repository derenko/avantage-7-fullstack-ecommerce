import { Status } from "@prisma/client";

interface OrderItemStatusProps {
  status: Status;
}

export function OrderItemStatus({ status }: OrderItemStatusProps) {
  if (status === Status.Processing || status === Status.Created) {
    return (
      <div className="bg-zinc-300 sm:w-[145px] text-sm sm:py-3 sm:px-6 py-2 px-3 sm:rounded-lg rounded-md flex flex-row items-center justify-center">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 512 512"
          className="sm:block hidden text-sm mr-2"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 456c-110.3 0-200-89.7-200-200 0-54.8 21.7-105.9 61.2-144 6.4-6.2 16.6-6 22.7.4 6.2 6.4 6 16.6-.4 22.7-33.1 32-51.3 74.9-51.3 120.9 0 92.5 75.3 167.8 167.8 167.8S423.8 348.5 423.8 256c0-87.1-66.7-159-151.8-167.1v62.6c0 8.9-7.2 16.1-16.1 16.1s-16.1-7.2-16.1-16.1V72.1c0-8.9 7.2-16.1 16.1-16.1 110.3 0 200 89.7 200 200S366.3 456 256 456z" />
          <path d="M175.9 161.9l99.5 71.5c13.5 9.7 16.7 28.5 7 42s-28.5 16.7-42 7c-2.8-2-5.2-4.4-7-7l-71.5-99.5c-3.2-4.5-2.2-10.8 2.3-14 3.6-2.6 8.3-2.4 11.7 0z" />
        </svg>
        <p className="text-sm text-center bg-zinc-300">{status}</p>
      </div>
    );
  }

  if (status === Status.Paid) {
    return (
      <div className="bg-green-500 text-white sm:w-[145px] text-sm sm:py-3 sm:px-6 py-2 px-3 sm:rounded-lg rounded-md flex flex-row items-center justify-center">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 512 512"
          className="sm:block hidden text-sm mr-2"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M387.581 139.712L356.755 109 216.913 248.319l30.831 30.719 139.837-139.326zM481.172 109L247.744 340.469l-91.39-91.051-30.827 30.715L247.744 403 512 139.712 481.172 109zM0 280.133L123.321 403l30.829-30.713L31.934 249.418 0 280.133z" />
        </svg>
        <p className="text-sm text-center bg-green-500 text-white">Paid</p>
      </div>
    );
  }

  if (status === Status.Failed) {
    return (
      <div className="bg-red-700 text-white sm:w-[145px] text-sm sm:py-3 sm:px-6 py-2 px-3 sm:rounded-lg rounded-md flex flex-row items-center justify-center">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 512 512"
          className="sm:block hidden text-sm mr-2"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
        </svg>
        <p className="text-sm text-center bg-red-700 text-white">Failed</p>
      </div>
    );
  }
}
