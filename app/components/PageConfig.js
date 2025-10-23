"use client";

import { useEffect } from "react";
import { useDescription } from "./DescriptionProvider";

export default function PageConfig({ description, activePage }) {
  const { setDescription, setActivePage } = useDescription();

  useEffect(() => {
    if (description !== undefined) {
      setDescription(description);
    }
    if (activePage !== undefined) {
      setActivePage(activePage);
    }
  }, [description, activePage, setDescription, setActivePage]);

  return null;
}
