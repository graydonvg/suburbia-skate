import { Logo } from "@/components/Logo";

export default function Loading() {
  return (
    <div className="absolute inset-0 grid place-content-center bg-brand-navy font-sans text-[15vw] text-white opacity-100 transition-opacity duration-1000">
      <Logo className="w-[15vw] animate-squiggle text-brand-pink" />
      <p className="w-full animate-squiggle content-center text-center leading-none text-brand-lime">
        LOADING...
      </p>
    </div>
  );
}
