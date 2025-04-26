import { MonsterCard } from "./MonsterCard";
import { SpecialAbilityFn } from "../interfaces/SpecialAbilityFn";
import { monsterAbilityConfigs } from "../abilities/monster/monsterAbilityConfigs";

// Define monster types and their configuration
interface MonsterConfig {
  name: string;
  maxHealth: number;
  attackRange: [number, number];
  specialAbilities: SpecialAbilityFn[];
  specialTitles: string[];
  specialDescriptions: string[];
}

// Define monster configs (blueprint for creating monsters)
const monsterConfigs: MonsterConfig[] = [
  {
    name: "Wolf",
    maxHealth: 25,
    attackRange: [0, 6],
    specialAbilities: monsterAbilityConfigs.wolf.specialAbilities,
    specialTitles: monsterAbilityConfigs.wolf.specialTitles,
    specialDescriptions: monsterAbilityConfigs.wolf.specialDescriptions,
  },
  {
    name: "Snake",
    maxHealth: 23,
    attackRange: [0, 8],
    specialAbilities: monsterAbilityConfigs.snake.specialAbilities,
    specialTitles: monsterAbilityConfigs.snake.specialTitles,
    specialDescriptions: monsterAbilityConfigs.snake.specialDescriptions,
  },
  {
    name: "Hawk",
    maxHealth: 21,
    attackRange: [0, 8],
    specialAbilities: monsterAbilityConfigs.hawk.specialAbilities,
    specialTitles: monsterAbilityConfigs.hawk.specialTitles,
    specialDescriptions: monsterAbilityConfigs.hawk.specialDescriptions,
  },
  {
    name: "Bear",
    maxHealth: 27,
    attackRange: [0, 10],
    specialAbilities: monsterAbilityConfigs.bear.specialAbilities,
    specialTitles: monsterAbilityConfigs.bear.specialTitles,
    specialDescriptions: monsterAbilityConfigs.bear.specialDescriptions,
  },
  {
    name: "Owl",
    maxHealth: 22,
    attackRange: [0, 6],
    specialAbilities: monsterAbilityConfigs.owl.specialAbilities,
    specialTitles: monsterAbilityConfigs.owl.specialTitles,
    specialDescriptions: monsterAbilityConfigs.owl.specialDescriptions,
  },
];

// Factory function to create a new monster instance from config
function createMonster(config: MonsterConfig): MonsterCard {
  return new MonsterCard(
    config.name,
    config.maxHealth,
    config.attackRange,
    config.specialAbilities,
    config.specialTitles,
    config.specialDescriptions
  );
}

// Export a function to get a fresh copy of the monster deck where each monster is newly instantiated
export const getMonsterDeck = (): MonsterCard[] => {
  // Create new instances of each monster
  return monsterConfigs.map((config) => createMonster(config));
};

// For backward compatibility and if needed to access the original monster cards list
export const monsterCards = monsterConfigs.map((config) =>
  createMonster(config)
);
