import { SpecialAbilityFn } from "./SpecialAbilityFn";

// ----------------------------------------------------------------------------
// Interface: describes the "shape" of any card (hero or monster)
// ----------------------------------------------------------------------------
export interface ICharacterCard {
  /** Card's name (e.g. "Fighter", "Wolf") */
  name: string;

  /** Path to the card's image (e.g. "/fighter.png") */
  imagePath: string;

  /** Maximum HP */
  maxHealth: number;
  /** Current HP (never below 0 or above maxHealth) */
  currentHealth: number;

  /** Basic attack roll range [min, max] */
  attackRange: [number, number];

  /** Next‑turn damage multiplier (1 = normal, 0.5 = half damage) */
  damageMultiplierNextTurn: number;
  /** Next‑turn flat damage mitigation (0 = none, 5 = subtract 5 damage) */
  damageSubtractorNextTurn: number;

  /** Array of titles for each special ability (e.g. "Shield Slam", "Power Strike") */
  specialTitles: string[];

  /** Array of descriptions for each special ability */
  specialDescriptions: string[];

  /** Two special abilities carried as real methods */
  specialAbilities: SpecialAbilityFn[];

  /**
   * Apply incoming damage (with modifiers), clamp HP ≥ 0,
   * then reset modifiers back to defaults.
   */
  takeDamage(amount: number): void;

  /** Heal this card up to its maxHealth */
  heal(amount: number): void;
}
