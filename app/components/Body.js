"use client";

import { useState, memo } from "react";
import Link from "next/link";
import Logo from "../svg/Logo";
import NavIcon from "../svg/NavIcon";
import ScrambleText from "./ScrambleText";
import SvgHover from "./SvgHover";
import ContactModal from "./ContactModal";

const Body = memo(function Body({
  description = "A Design Engineer Now in Abuja, Nigeria",
  activePage = "",
}) {
  const [isScrambled, setIsScrambled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleToggle = () => {
    setHasInteracted(true);
    setIsScrambled((prev) => !prev);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  return (
    <section>
      <div className=" px-7 pt-5 md:pt-20 md:px-20 lg:px-56 ">
        <div className="flex flex-row ">
          <div className=" w-full ">
            <div className="hidden md:block">
              <div className=" flex flex-row justify-between">
                <div className=" flex flex-row gap-3">
                  <Link href="/" className=" ">
                    <h4 className="text-2xl md:text-3xl uppercase font-bold">
                      Ayotomcs
                    </h4>
                  </Link>
                  <Link href="/" className=" self-center">
                    <div className="">
                      <Logo />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-2">
              {/* <svg
                className="w-full md:hidden h-px"
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
              </svg> */}
              <Link href="/" className=" md:hidden self-center ">
                <div className="">
                  <Logo />
                </div>
              </Link>
              <div className="md:hidden py-2 w-full flex">
                <div className=" flex flex-row gap-3"></div>
                <div className="flex text-nowrap self-end justify-between ml-auto">
                  {isScrambled ? (
                    <>
                      <Link href="/list" className="">
                        <ScrambleText
                          originalText="Projects"
                          targetText="List∞"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] underline underline-offset-2 ${
                            activePage === "/list" ? "text-[#4447A9]" : ""
                          }`}
                        />
                      </Link>
                      <a href="https://screens.ayotomcs.me" target="_blank" rel="noopener noreferrer" className="pl-3 ">
                        <ScrambleText
                          originalText="Resumé"
                          targetText="Screens"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] underline underline-offset-2 ${
                            activePage === "/screens" ? "text-[#4447A9]" : ""
                          }`}
                        />
                      </a>
                      <Link href="/now" className="pl-3">
                        <ScrambleText
                          originalText="Contact"
                          targetText="Now"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] underline underline-offset-2 ${
                            activePage === "/now" ? "text-[#4447A9]" : ""
                          }`}
                        />
                      </Link>

                      <Link href="/guestbook" className="pl-3 ">
                        <ScrambleText
                          originalText="Lab"
                          targetText="GuestBook"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] underline underline-offset-2 ${
                            activePage === "/guestbook" ? "text-[#4447A9]" : ""
                          }`}
                        />
                      </Link>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://drive.google.com/file/d/1UcuH-oolA0c_vMYflzil6Dl1_EnEnOxd/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        <ScrambleText
                          originalText="Resumé"
                          targetText="List∞"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className="text-sm md:text-[12px]  underline px- underline-offset-2 "
                        />
                      </a>
                      <div className="group relative pl-3 opacity-50">
                        <ScrambleText
                          originalText="Lab"
                          targetText="Guestbook"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] px- underline underline-offset-2`}
                        />
                        <div className="absolute bottom-full mb-2 hidden group-hover:block">
                          <div className="bg-black text-white text-xs rounded py-1 px-2 text-nowrap">
                            Coming Soon
                          </div>
                        </div>
                      </div>

                      <Link href="/projects" scroll={true} className="pl-3">
                        <ScrambleText
                          originalText="Projects"
                          targetText="Lab"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] underline underline-offset-2 ${
                            activePage === "/projects" ? "text-[#4447A9]" : ""
                          }`}
                        />
                      </Link>
                      <a href="#" onClick={handleContactClick} className="pl-3">
                        <ScrambleText
                          originalText="Contact"
                          targetText="Now"
                          isScrambled={isScrambled}
                          hasInteracted={hasInteracted}
                          className={`text-sm md:text-[12px] underline underline-offset-2 ${
                            activePage === "/contact" ? "text-[#4447A9]" : ""
                          }`}
                        />
                      </a>
                    </>
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
              <div className=" flex flex-row justify-between">
                <div>
                  <h4 className="text-sm md:text-[13px] py-2 md:py-3">
                    {description}
                  </h4>
                </div>

                <div className="hidden md:block self-center">
                  <div className="flex ">
                    {isScrambled ? (
                      <>
                        <Link href="/list" className="pl-4 ">
                          <ScrambleText
                            originalText="Projects"
                            targetText="List∞"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] underline underline-offset-2 ${
                              activePage === "/list" ? "text-[#4447A9]" : ""
                            }`}
                          />
                        </Link>
                        <a href="https://screens.ayotomcs.me" target="_blank" rel="noopener noreferrer" className="pl-4 ">
                          <ScrambleText
                            originalText="Resumé"
                            targetText="Screens"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] underline underline-offset-2 ${
                              activePage === "/screens" ? "text-[#4447A9]" : ""
                            }`}
                          />
                        </a>
                        <Link href="/now" className="pl-4">
                          <ScrambleText
                            originalText="Contact"
                            targetText="Now"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] underline underline-offset-2 ${
                              activePage === "/now" ? "text-[#4447A9]" : ""
                            }`}
                          />
                        </Link>

                        <Link href="/guestbook" className="pl-4 ">
                          <ScrambleText
                            originalText="Lab"
                            targetText="GuestBook"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] underline underline-offset-2 ${
                              activePage === "/guestbook"
                                ? "text-[#4447A9]"
                                : ""
                            }`}
                          />
                        </Link>
                      </>
                    ) : (
                      <>
                        <a
                          href="https://drive.google.com/file/d/1UcuH-oolA0c_vMYflzil6Dl1_EnEnOxd/view"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pl-4"
                        >
                          <ScrambleText
                            originalText="Resumé"
                            targetText="List ∞"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className="text-sm md:text-[13px]  underline px- underline-offset-2 "
                          />
                        </a>
                        <div className="group relative pl-4 opacity-50">
                          <ScrambleText
                            originalText="Lab"
                            targetText="Guestbook"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] px- underline underline-offset-2`}
                          />
                          <div className="absolute bottom-full mb-2 hidden group-hover:block">
                            <div className="bg-black text-white text-xs rounded py-1 px-2 text-nowrap">
                              Coming Soon
                            </div>
                          </div>
                        </div>

                        <Link href="/projects" scroll={true} className="pl-4 ">
                          <ScrambleText
                            originalText="Projects"
                            targetText="Lab"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] underline underline-offset-2 ${
                              activePage === "/projects" ? "text-[#4447A9]" : ""
                            }`}
                          />
                        </Link>
                        <a href="#" onClick={handleContactClick} className="pl-4">
                          <ScrambleText
                            originalText="Contact"
                            targetText="Now"
                            isScrambled={isScrambled}
                            hasInteracted={hasInteracted}
                            className={`text-sm md:text-[13px] underline underline-offset-2 ${
                              activePage === "/contact" ? "text-[#4447A9]" : ""
                            }`}
                          />
                        </a>
                      </>
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
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
});

export default Body;
