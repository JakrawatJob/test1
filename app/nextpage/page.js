"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Hello() {
  const searchParams = useSearchParams();

  const Name = searchParams.get("name");
  const lastName = searchParams.get("lastname");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 text-center lg:max-w-8xl lg:w-full lg:mb-0 lg:flex lg:items-center lg:justify-between">
        <Link href="/facedetect">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold flex items-center`}>
              {Name} {lastName}
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-left`}>
              Detect {Name} {lastName} face
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
