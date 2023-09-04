export async function Footer() {
  return (
    <div className="sm:mx-3 mx-1 px-2 sm:py-5 py-4 border-t border-zinc-300">
      <span className="block text-md text-center text-gray-600">
        © {new Date().getFullYear()}
      </span>
    </div>
  );
}
