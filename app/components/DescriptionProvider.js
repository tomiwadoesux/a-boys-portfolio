"use client";

import { createContext, useContext, useState } from "react";

const DescriptionContext = createContext();

export function DescriptionProvider({ children }) {
  const [description, setDescription] = useState(
    <>
      A Design Engineer Now in{" "}
      <span className="text-[#4447A9]">Abuja, Nigeria</span>
    </>
  );
  const [activePage, setActivePage] = useState("");

  return (
    <DescriptionContext.Provider value={{ description, setDescription, activePage, setActivePage }}>
      {children}
    </DescriptionContext.Provider>
  );
}

export function useDescription() {
  const context = useContext(DescriptionContext);
  if (!context) {
    throw new Error("useDescription must be used within DescriptionProvider");
  }
  return context;
}
