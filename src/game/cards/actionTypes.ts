// ----------------------------------------------------------------------------
// 1) Re‑alias our special‑ability signature for clarity on actions
// ----------------------------------------------------------------------------
import { SpecialAbilityFn } from "../../components/game/cards/types";
import {
  CharacterCard,
  EffectResult,
} from "../../components/game/cards/CharacterCard";

export type ActionEffect = (
  user: CharacterCard,
  target: CharacterCard
) => EffectResult;
// (i.e. (user: CharacterCard, target: CharacterCard) => EffectResult)

// ----------------------------------------------------------------------------
// 2) Interface: what every action card must have
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
}
