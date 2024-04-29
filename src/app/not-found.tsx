import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-6 h-[100vh]">
      <h1 className="text-3xl font-bold">Nie znaleziono strony</h1>
      <Link href={"/"}>
        <button className="rounded p-2 bg-blue-300 ">
          Powrót do strony głównej
        </button>
      </Link>
    </div>
  );
}
