import { CSSProperties, FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { ParallaxImage } from "./ParallaxImage";
import SlideIn from "@/components/SlideIn";

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  const theme = slice.primary.theme;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn("texture-bg sticky top-[calc(var(--index)*2rem)]", {
        "bg-brand-blue text-white": theme === "Blue",
        "bg-brand-orange text-white": theme === "Orange",
        "bg-brand-navy text-white": theme === "Navy",
        "bg-brand-lime": theme === "Lime",
      })}
      style={
        {
          "--index": index,
        } as CSSProperties
      }
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={cn(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            {
              "md:order-2": slice.variation === "imageOnLeft",
            },
          )}
        >
          <SlideIn>
            <Heading as="h2" size="lg">
              <PrismicText field={slice.primary.heading} />
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </SlideIn>
          <SlideIn>
            <ButtonLink
              field={slice.primary.button}
              color={theme === "Lime" ? "orange" : "lime"}
            >
              {slice.primary.button.text}
            </ButtonLink>
          </SlideIn>
        </div>

        <ParallaxImage
          backgroundImage={slice.primary.background_image}
          foregroundImage={slice.primary.foreground_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
