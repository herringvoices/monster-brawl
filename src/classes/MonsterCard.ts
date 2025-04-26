// ----------------------------------------------------------------------------
// MonsterCard: for all monsters
// ----------------------------------------------------------------------------
import { CharacterCard } from "./CharacterCard";
import { SpecialAbilityFn } from "../interfaces/SpecialAbilityFn";

export class MonsterCard extends CharacterCard {
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

  // You can add monster‑only methods here later
}
