import React, { createContext, useState, useContext, ReactNode } from "react";
import { Player } from "../types/Player";
import { Region } from "../types/Region";
import { Pokemon } from "../types/Pokemon";

interface GlobalState {
  playerInfo: Player | null;
  partnerPokemon: Pokemon | null;
  regions: Region[] | null;
  activeScreen: {
    currentGameArea: string;
    currentLocation: { name: string; displayName: string };
    currentRegion: Region;
  } | null;
}

// Define the shape of the context value
interface GlobalStateContextProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

// Create the context with a default value
const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
  undefined
);

// Create the provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    playerInfo: null,
    partnerPokemon: null,
    regions: null,
    activeScreen: {
      currentGameArea: "homeBase",
      currentLocation: { name: "", displayName: "" },
      currentRegion: {} as Region,
    },
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = (): GlobalStateContextProps => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
