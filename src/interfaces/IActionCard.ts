import { CharacterCard } from "../classes/CharacterCard";
import { EffectResult } from "../classes/CharacterCard";

// ----------------------------------------------------------------------------
// Re‑alias our special‑ability signature (change its name) from
// SpecialAbilityFn to ActionEffect for clarity in the context of action cards
// ----------------------------------------------------------------------------
export type ActionEffect = (
  user: CharacterCard,
  target: CharacterCard
) => EffectResult;

// ----------------------------------------------------------------------------
// Interface: what every action card must have
// ----------------------------------------------------------------------------
export interface IActionCard {
  /** The card's display name (e.g. "Attack", "Defend", "Health Potion") */
  name: string;

  /**
   * The function to run when this card is played.
   * user = the card playing this action;
   * target = the opponent (or could be the same as user for self‑effects)
   * @returns EffectResult object with effect type, value and message
   */
  effect: ActionEffect;

  /** Optional note for students / UI display */
  description?: string;

  /** Path to the card's image */
  imagePath: string;
}
