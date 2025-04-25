/* eslint-disable @typescript-eslint/no-unused-vars */
import { HeroCard } from "../../components/game/cards/HeroCard";
import { SpecialAbilityFn } from "../../components/game/cards/types";
import { CharacterCard } from "../../components/game/cards/CharacterCard";

// Utility functions for common special ability operations
const rollDamage = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const performChanceEffect = (chance: number, successFn: () => void): void => {
  if (Math.random() < chance) {
    successFn();
  }
  // Do nothing on failure (miss)
};

// Fighter special ability functions
const fighterShieldSlam = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(4);
  user.damageMultiplierNextTurn = 0.5; // Reduce next incoming damage by half
};

const fighterPowerStrike = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 10) + 2; // Roll 0-10 and add 2
  target.takeDamage(damage);
};

// Barbarian special ability functions
const barbarianBloodSacrifice = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  user.takeDamage(5); // Self damage
  target.takeDamage(16);
};

const barbarianBerserkerFury = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  const roll = Math.random();
  if (roll < 0.7) {
    target.takeDamage(14); // 70% chance
  } else if (roll < 0.9) {
    // 20% chance to do nothing
  } else {
    user.takeDamage(7); // 10% chance to self-damage
  }
};

// Paladin special ability functions
const paladinDivineSmite = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 8) + 4; // Roll 0-8 and add 4
  target.takeDamage(damage);
};

const paladinLayOnHands = (
  user: CharacterCard,
  _target: CharacterCard
): void => {
  user.heal(10);
};

// Archer special ability functions
const archerPiercingShot = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 8) + 4; // Roll 0-8 and add 4
  target.takeDamage(damage);
};

const archerVolley = (_user: CharacterCard, target: CharacterCard): void => {
  const roll1 = rollDamage(0, 4); // Roll 0-4
  const roll2 = rollDamage(0, 4); // Roll 0-4
  const roll3 = rollDamage(0, 4); // Roll 0-4
  const damage = roll1 + roll2 + roll3;
  target.takeDamage(damage);
};

// Rogue special ability functions
const rogueAssassinate = (_user: CharacterCard, target: CharacterCard): void => {
  performChanceEffect(0.7, () => {
    target.takeDamage(12); // 70% chance to hit
  });
};

const rogueDoubleStab = (_user: CharacterCard, target: CharacterCard): void => {
  const roll1 = rollDamage(0, 8); // Roll 0-8
  const roll2 = rollDamage(0, 8); // Roll 0-8
  const damage = roll1 + roll2;
  target.takeDamage(damage);
};

// Monk special ability functions
const monkFlurryOfBlows = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const roll1 = rollDamage(0, 6); // Roll 0-6
  const roll2 = rollDamage(0, 6); // Roll 0-6
  const roll3 = rollDamage(0, 6); // Roll 0-6
  const damage = Math.max(roll1, roll2, roll3);
  target.takeDamage(damage);
};

const monkInnerPeace = (user: CharacterCard, target: CharacterCard): void => {
  target.takeDamage(6);
  user.heal(6);
};

// Mage special ability functions
const mageFireball = (_user: CharacterCard, target: CharacterCard): void => {
  performChanceEffect(0.6, () => {
    target.takeDamage(14); // 60% chance to hit
  });
};

const mageArcaneBlast = (_user: CharacterCard, target: CharacterCard): void => {
  const damage = rollDamage(0, 12) + 2; // Roll 0-12 and add 2
  target.takeDamage(damage);
};

// Necromancer special ability functions
const necromancerLifeDrain = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(8);
  user.heal(4);
};

const necromancerDarkRitual = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  if (Math.random() < 0.5) {
    target.takeDamage(14); // Heads: deal damage
  } else {
    user.heal(7); // Tails: heal
  }
};

// Healer special ability functions
const healerRejuvenation = (
  user: CharacterCard,
  _target: CharacterCard
): void => {
  user.heal(12);
};

const healerSoothingRain = (
  user: CharacterCard,
  _target: CharacterCard
): void => {
  const healAmount = rollDamage(0, 8) + 2; // Roll 0-8 and add 2
  user.heal(healAmount);
};

// Define the hero special abilities arrays
const fighterSpecials: SpecialAbilityFn[] = [
  fighterShieldSlam,
  fighterPowerStrike,
];
const fighterTitles = ["Shield Slam", "Power Strike"];
const fighterDescriptions = [
  "Deal 4 damage and reduce your next incoming damage by half",
  "Roll 0–10 and add 2 damage",
];

const barbarianSpecials: SpecialAbilityFn[] = [
  barbarianBloodSacrifice,
  barbarianBerserkerFury,
];
const barbarianTitles = ["Blood Sacrifice", "Berserker Fury"];
const barbarianDescriptions = [
  "Lose 5 HP; deal 16 damage",
  "70% chance to deal 14; 20% chance to do nothing; 10% chance to self‑damage 7",
];

const paladinSpecials: SpecialAbilityFn[] = [
  paladinDivineSmite,
  paladinLayOnHands,
];
const paladinTitles = ["Divine Smite", "Lay on Hands"];
const paladinDescriptions = ["Roll 0–8 and add 4 damage", "Heal 10 HP"];

const archerSpecials: SpecialAbilityFn[] = [archerPiercingShot, archerVolley];
const archerTitles = ["Piercing Shot", "Volley"];
const archerDescriptions = [
  "Roll 0–8 and add 4 damage",
  "Roll 0–4 three times; sum for total damage (0–12)",
];

const rogueSpecials: SpecialAbilityFn[] = [rogueAssassinate, rogueDoubleStab];
const rogueTitles = ["Assassinate", "Double Stab"];
const rogueDescriptions = [
  "70% chance to deal 12 damage; 30% chance to miss",
  "Roll 0–8 twice; add both results",
];

const monkSpecials: SpecialAbilityFn[] = [monkFlurryOfBlows, monkInnerPeace];
const monkTitles = ["Flurry of Blows", "Inner Peace"];
const monkDescriptions = [
  "Roll Basic Attack three times; take the highest result",
  "Deal 6 damage and heal 6 HP",
];

const mageSpecials: SpecialAbilityFn[] = [mageFireball, mageArcaneBlast];
const mageTitles = ["Fireball", "Arcane Blast"];
const mageDescriptions = [
  "60% chance to deal 14 damage; 40% chance to fizzle (0)",
  "Roll 0–12 and add 2 damage (2–14)",
];

const necromancerSpecials: SpecialAbilityFn[] = [
  necromancerLifeDrain,
  necromancerDarkRitual,
];
const necromancerTitles = ["Life Drain", "Dark Ritual"];
const necromancerDescriptions = [
  "Deal 8 damage and heal 4 HP",
  "Flip a coin—heads deal 14 damage; tails heal 7 HP",
];

const healerSpecials: SpecialAbilityFn[] = [
  healerRejuvenation,
  healerSoothingRain,
];
const healerTitles = ["Rejuvenation", "Soothing Rain"];
const healerDescriptions = [
  "Heal 12 HP",
  "Roll 0–8 and add 2; heal that amount (2–10)",
];

// Create all the hero cards
export const heroCards = [
  new HeroCard(
    "Fighter",
    28,
    [0, 10],
    fighterSpecials,
    fighterTitles,
    fighterDescriptions
  ),
  new HeroCard(
    "Barbarian",
    32,
    [0, 10],
    barbarianSpecials,
    barbarianTitles,
    barbarianDescriptions
  ),
  new HeroCard(
    "Paladin",
    28,
    [0, 8],
    paladinSpecials,
    paladinTitles,
    paladinDescriptions
  ),
  new HeroCard(
    "Archer",
    24,
    [0, 8],
    archerSpecials,
    archerTitles,
    archerDescriptions
  ),
  new HeroCard(
    "Rogue",
    22,
    [0, 8],
    rogueSpecials,
    rogueTitles,
    rogueDescriptions
  ),
  new HeroCard("Monk", 26, [0, 6], monkSpecials, monkTitles, monkDescriptions),
  new HeroCard("Mage", 20, [0, 6], mageSpecials, mageTitles, mageDescriptions),
  new HeroCard(
    "Necromancer",
    22,
    [0, 6],
    necromancerSpecials,
    necromancerTitles,
    necromancerDescriptions
  ),
  new HeroCard(
    "Healer",
    22,
    [0, 4],
    healerSpecials,
    healerTitles,
    healerDescriptions
  ),
];

// Export a function to get a fresh copy of the hero deck
export const getHeroDeck = (): HeroCard[] => {
  return [...heroCards]; // Return a copy to prevent modifying the original
};
