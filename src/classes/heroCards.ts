/* eslint-disable @typescript-eslint/no-unused-vars */
import { HeroCard } from "./HeroCard";
import { SpecialAbilityFn } from "../interfaces/SpecialAbilityFn";
import { heroAbilityConfigs } from "../abilities/hero/heroAbilityConfigs";

// Define hero types and their configuration
interface HeroConfig {
  name: string;
  maxHealth: number;
  attackRange: [number, number];
  specialAbilities: SpecialAbilityFn[];
  specialTitles: string[];
  specialDescriptions: string[];
}

// Define hero configs (blueprint for creating heroes)
const heroConfigs: HeroConfig[] = [
  {
    name: "Fighter",
    maxHealth: 28,
    attackRange: [0, 10],
    specialAbilities: heroAbilityConfigs.fighter.specialAbilities,
    specialTitles: heroAbilityConfigs.fighter.specialTitles,
    specialDescriptions: heroAbilityConfigs.fighter.specialDescriptions,
  },
  {
    name: "Barbarian",
    maxHealth: 32,
    attackRange: [0, 10],
    specialAbilities: heroAbilityConfigs.barbarian.specialAbilities,
    specialTitles: heroAbilityConfigs.barbarian.specialTitles,
    specialDescriptions: heroAbilityConfigs.barbarian.specialDescriptions,
  },
  {
    name: "Paladin",
    maxHealth: 28,
    attackRange: [0, 8],
    specialAbilities: heroAbilityConfigs.paladin.specialAbilities,
    specialTitles: heroAbilityConfigs.paladin.specialTitles,
    specialDescriptions: heroAbilityConfigs.paladin.specialDescriptions,
  },
  {
    name: "Archer",
    maxHealth: 24,
    attackRange: [0, 8],
    specialAbilities: heroAbilityConfigs.archer.specialAbilities,
    specialTitles: heroAbilityConfigs.archer.specialTitles,
    specialDescriptions: heroAbilityConfigs.archer.specialDescriptions,
  },
  {
    name: "Rogue",
    maxHealth: 22,
    attackRange: [0, 8],
    specialAbilities: heroAbilityConfigs.rogue.specialAbilities,
    specialTitles: heroAbilityConfigs.rogue.specialTitles,
    specialDescriptions: heroAbilityConfigs.rogue.specialDescriptions,
  },
  {
    name: "Monk",
    maxHealth: 26,
    attackRange: [0, 6],
    specialAbilities: heroAbilityConfigs.monk.specialAbilities,
    specialTitles: heroAbilityConfigs.monk.specialTitles,
    specialDescriptions: heroAbilityConfigs.monk.specialDescriptions,
  },
  {
    name: "Mage",
    maxHealth: 20,
    attackRange: [0, 6],
    specialAbilities: heroAbilityConfigs.mage.specialAbilities,
    specialTitles: heroAbilityConfigs.mage.specialTitles,
    specialDescriptions: heroAbilityConfigs.mage.specialDescriptions,
  },
  {
    name: "Necromancer",
    maxHealth: 22,
    attackRange: [0, 6],
    specialAbilities: heroAbilityConfigs.necromancer.specialAbilities,
    specialTitles: heroAbilityConfigs.necromancer.specialTitles,
    specialDescriptions: heroAbilityConfigs.necromancer.specialDescriptions,
  },
  {
    name: "Healer",
    maxHealth: 22,
    attackRange: [0, 4],
    specialAbilities: heroAbilityConfigs.healer.specialAbilities,
    specialTitles: heroAbilityConfigs.healer.specialTitles,
    specialDescriptions: heroAbilityConfigs.healer.specialDescriptions,
  },
];

// Factory function to create a new hero instance from config
function createHero(config: HeroConfig): HeroCard {
  return new HeroCard(
    config.name,
    config.maxHealth,
    config.attackRange,
    config.specialAbilities,
    config.specialTitles,
    config.specialDescriptions
  );
}

// Export a function to get a fresh copy of the hero deck
export const getHeroDeck = (): HeroCard[] => {
  return heroConfigs.map((config) => createHero(config));
};

// For backward compatibility and if needed to access the original hero cards list
export const heroCards = heroConfigs.map((config) => createHero(config));
