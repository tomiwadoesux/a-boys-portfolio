"use client";

import { useDescription } from "./DescriptionProvider";
import Body from "./Body";

export default function PersistentBody() {
  const { description, activePage } = useDescription();

  return <Body description={description} activePage={activePage} />;
}
