"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function UserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link href="/">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Homepage{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore starter templates for Next.js.
            </p>
          </div>
        </Link>
        <Link href="/aigenfacedetection">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              aigenfacedetection{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore starter templates for Next.js.
            </p>
          </div>
        </Link>
        <Link href="/testlogicsimple">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              testlogic{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore starter templates for Next.js.
            </p>
          </div>
        </Link>
        <Link href="/serverprocess">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              testlogicserver{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore starter templates for Next.js.
            </p>
          </div>
        </Link>
        <div className="col-span-4 mt-8">
          <form className="flex flex-col space-y-4">
            <Input
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <Input
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <Link
              href={{
                pathname: "/nextpage",
                query: { name: firstName, lastname: lastName },
              }}
            >
              <Button type="submit">Login</Button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
