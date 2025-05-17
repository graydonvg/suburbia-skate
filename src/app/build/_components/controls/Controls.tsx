"use client";

import { Content } from "@prismicio/client";
import { useCustomizerControlsContext } from "../../context";
import { cn } from "@/lib/utils";
import Options from "./Options";
import Option from "./Option";

interface Props
  extends Pick<
    Content.BoardCustomizerDocumentData,
    "wheels" | "decks" | "metals"
  > {
  className?: string;
}

export default function Controls({ wheels, decks, metals, className }: Props) {
  const {
    setWheel,
    setDeck,
    setTruck,
    setBolt,
    selectedWheel,
    selectedDeck,
    selectedTruck,
    selectedBolt,
  } = useCustomizerControlsContext();

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      Controls
      <Options title="Deck" selecedName={selectedDeck?.uid}>
        {decks.map((deck) => (
          <Option
            key={deck.uid}
            imageField={deck.texture}
            imgixParams={{
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            selected={deck.uid === selectedDeck?.uid}
            onClick={() => setDeck(deck)}
          >
            {deck.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selecedName={selectedWheel?.uid}>
        {wheels.map((wheel) => (
          <Option
            key={wheel.uid}
            imageField={wheel.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            selected={wheel.uid === selectedWheel?.uid}
            onClick={() => setWheel(wheel)}
          >
            {wheel.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selecedName={selectedTruck?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === selectedTruck?.uid}
            onClick={() => setTruck(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selecedName={selectedBolt?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === selectedBolt?.uid}
            onClick={() => setBolt(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
    </div>
  );
}
