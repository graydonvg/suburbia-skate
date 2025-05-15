import { useEffect, useState } from "react";

export function useIntersectionObserver<T extends Element>(
  targetRef: React.RefObject<T | null>,
  {
    root = null,
    rootMargin = "0px",
    threshold = 0,
  }: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
  } = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = targetRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [targetRef, root, rootMargin, threshold]);

  return isIntersecting;
}
