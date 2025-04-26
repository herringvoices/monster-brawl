import { CharacterCard } from "../classes/CharacterCard";

// ----------------------------------------------------------------------------
// Define the signature for any special‑ability function:
// it takes the user (the card playing it) and the target, and returns void
// ----------------------------------------------------------------------------
export type SpecialAbilityFn = (
  user: CharacterCard,
  target: CharacterCard
) => void;
