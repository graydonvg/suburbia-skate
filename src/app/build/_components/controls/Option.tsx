"use client";

import { cn } from "@/lib/utils";
import { ColorField, ImageField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import { ComponentProps, ReactNode } from "react";

// children is optional on button
// omit children and add it as non-optional
type Props = ({
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "children">) &
  (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {
        colorField?: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

export default function Option({
  selected,
  onClick,
  children,
  imageField,
  imgixParams,
  colorField,
}: Props) {
  return (
    <li>
      <button
        className={cn(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          {
            outline: selected,
          },
        )}
        onClick={onClick}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none size-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="size-full rounded-full"
            style={{
              backgroundColor: colorField ?? undefined,
            }}
          />
        )}
        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
