// ----------------------------------------------------------------------------
// 4) HeroCard: for all heroes
// ----------------------------------------------------------------------------
import { CharacterCard } from "./CharacterCard";
import { SpecialAbilityFn } from "./types";

export class HeroCard extends CharacterCard {
  constructor(
    name: string,
    maxHealth: number,
    attackRange: [number, number],
    specialAbilities: SpecialAbilityFn[],
    specialTitles: string[],
    specialDescriptions: string[]
  ) {
    super(
      name,
      maxHealth,
      attackRange,
      specialAbilities,
      specialTitles,
      specialDescriptions
    );
  }

  // You can add hero‑only methods here later
}
