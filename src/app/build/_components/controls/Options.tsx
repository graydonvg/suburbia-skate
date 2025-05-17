"use client";

import { ReactNode } from "react";
import { KeyTextField } from "@prismicio/client";
import { Heading } from "@/components/Heading";

type Props = {
  title?: ReactNode;
  selecedName?: KeyTextField;
  children?: ReactNode;
};

export default function Options({ title, selecedName, children }: Props) {
  const formattedName = selecedName?.replace(/-/g, " ");

  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formattedName}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}
