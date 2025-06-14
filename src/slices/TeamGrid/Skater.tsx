"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SkaterScribble } from "./SkaterScribble";
import { cn } from "@/lib/utils";

type Props = {
  skater: Content.SkaterDocument;
  index: number;
};

export function Skater({ skater, index }: Props) {
  const colors = [
    "text-brand-blue",
    "text-brand-lime",
    "text-brand-orange",
    "text-brand-purple",
    "text-brand-pink",
    "text-brand-navy",
  ];

  const scribbleColors = colors[index % colors.length];

  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout textbrand overflow-hidden">
        <PrismicNextImage
          field={skater.data.photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          alt=""
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <SkaterScribble className={cn("relative", scribbleColors)} />
        <PrismicNextImage
          field={skater.data.photo_foreground}
          width={500}
          alt=""
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink field={skater.data.customizer_link} size="sm">
        {skater.data.customizer_link.text}
      </ButtonLink>
    </div>
  );
}
