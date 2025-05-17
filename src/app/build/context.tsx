"use client";

import { Content } from "@prismicio/client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type CustomizerControlsContextType = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;

  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;

  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (truck: Content.BoardCustomizerDocumentDataMetalsItem) => void;

  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (truck: Content.BoardCustomizerDocumentDataMetalsItem) => void;
};

const defaultContext: CustomizerControlsContextType = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  children: ReactNode;
};

export function CustomizerControlsProvider({
  defaultDeck,
  defaultWheel,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTruck, setTruck] = useState(defaultTruck);
  const [selectedBolt, setBolt] = useState(defaultBolt);

  const value = useMemo<CustomizerControlsContextType>(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    };
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControlsContext() {
  const context = useContext(CustomizerControlsContext);

  if (!context) {
    throw new Error(
      "useCustomizerControlsContext must be used within a CustomizerControlsProvider",
    );
  }

  return context;
}
