import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 outline">
      <div className="py-10 flex flex-col lg:flex-row items-center max-w-3xl m-auto">
        <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          {SITE_NAME}
        </h3>
        <div className="flex flex-col justify-center items-center lg:pl-4 lg:w-1/2">
          <Link href="/#topics">
            <a className="hover:underline mb-5">Topics</a>
          </Link>
          <Link href="/questions">
            <a className="hover:underline mb-5">Talk</a>
          </Link>
          <Link href="/about-us">
            <a className="hover:underline mb-5">About Us</a>
          </Link>
          <Link href="mailto:drew@20sos.co.uk">
            <a className="hover:underline mb-5">Contact</a>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center lg:pl-4 lg:w-1/2">
          <Link href="/terms-and-conditions">
            <a className="hover:underline mb-5 text-sm">T&C</a>
          </Link>
          <Link href="/privacy-policy">
            <a className="hover:underline mb-5 text-sm">Privacy Policy</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
