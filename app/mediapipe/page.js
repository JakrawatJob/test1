// pages/index.js
import React from "react";
import CameraPage from "./test5_3";
import Link from "next/link";
const Home = () => {
  return (
    <div>
      <h1>Next.js App</h1>
      <CameraPage />
      <Link href="/">
        <div className="group rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-1/5">
          <h2 className={`mb-2 text-lg font-semibold`}>
            Homepage{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[20ch] text-xs opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Home;
