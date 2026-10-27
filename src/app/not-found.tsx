import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="text-2xl font-extrabold">Page not found</h1>
      <Link href="/" className="rounded-full bg-ziva px-6 py-3 text-lg font-bold text-white">Go to lessons</Link>
    </main>
  );
}
