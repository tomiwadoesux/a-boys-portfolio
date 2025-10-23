"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../svg/Logo";
import NavIcon from "../svg/NavIcon";
import ScrambleText from "./ScrambleText";
import ThemeToggle from "./ThemeToggle";
import Headd from "./Headd";

export default function BodyScreens({
  description = "A Design Engineer Now in Abuja, Nigeria",
}) {
  const [isScrambled, setIsScrambled] = useState(false);

  const handleToggle = () => {
    setIsScrambled((prev) => !prev);
  };

  return (
    <section>

      <div className=" px-10 md:px-20 lg:px-56 pt-28">
        <div className="flex flex-row ">
          <div className=" w-full ">
            <div className=" flex flex-row justify-between">
              <div className=" flex flex-row gap-3">
                <h1 className="text-3xl uppercase font-bold">Ayotomcs</h1>
                <div className="self-center">
                  <Logo />
                </div>
                <div className="self-center">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <svg
                className="w-full h-px"
                viewBox="0 0 100 1"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="0.5"
                  x2="100"
                  y2="0.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <div className=" flex flex-row justify-between">
                <div>
                  <h4 className="text-[13px] py-3">{description}</h4>
                </div>

                <div className="flex py-3">
                  <Link href="/guestbook" className="pl-4">
                    <ScrambleText
                      originalText=""
                      targetText="GuestBook"
                      isScrambled={isScrambled}
                      className="text-[13px] underline underline-offset-2 "
                    />
                  </Link>
                  <Link href="/lab" className="pl-4">
                    <ScrambleText
                      originalText=""
                      targetText="Lab"
                      isScrambled={isScrambled}
                      className="text-[13px] underline underline-offset-2 "
                    />
                  </Link>
                  {isScrambled ? (
                    <Link href="/list" className="pl-4">
                      <ScrambleText
                        originalText="Resumé"
                        targetText="List ∞"
                        isScrambled={isScrambled}
                        className="text-[13px] underline underline-offset-2 "
                      />
                    </Link>
                  ) : (
                    <a
                      href="https://drive.google.com/file/d/1MBEq0m1HuPqMKYSd1j8aJPeU3WUdnXkP/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pl-4"
                    >
                      <ScrambleText
                        originalText="Resumé"
                        targetText="List ∞"
                        isScrambled={isScrambled}
                        className="text-[13px] underline underline-offset-2 "
                      />
                    </a>
                  )}
                  {isScrambled ? (
                    <Link href="/screens" className="pl-4">
                      <ScrambleText
                        originalText="Projects"
                        targetText="Screens"
                        isScrambled={isScrambled}
                        className="text-[13px] underline underline-offset-2 "
                      />
                    </Link>
                  ) : (
                    <Link href="/projects" scroll={true} className="pl-4">
                      <ScrambleText
                        originalText="Projects"
                        targetText="Lab"
                        isScrambled={isScrambled}
                        className="text-[13px] underline underline-offset-2 "
                      />
                    </Link>
                  )}
                  {isScrambled ? (
                    <Link href="/now" className="pl-4">
                      <ScrambleText
                        originalText="Contact"
                        targetText="Now"
                        isScrambled={isScrambled}
                        className="text-[13px] underline underline-offset-2 "
                      />
                    </Link>
                  ) : (
                    <Link href="/contact" className="pl-4">
                      <ScrambleText
                        originalText="Contact"
                        targetText="Now"
                        isScrambled={isScrambled}
                        className="text-[13px] underline underline-offset-2 "
                      />
                    </Link>
                  )}

                  <div
                    className="pl-4 self-center cursor-pointer"
                    onClick={handleToggle}
                    role="button"
                    aria-label="Toggle navigation style"
                  >
                    <NavIcon isOpen={isScrambled} />
                  </div>
                </div>
              </div>

              <svg
                className="w-full h-px"
                viewBox="0 0 100 1"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="0.5"
                  x2="100"
                  y2="0.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
