/* eslint-disable @typescript-eslint/no-unused-vars */
import { CharacterCard } from "../../classes/CharacterCard";

// Utility functions for common special ability operations
export const rollDamage = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const performChanceEffect = (
  chance: number,
  successFn: () => void
): void => {
  if (Math.random() < chance) {
    successFn();
  }
  // Do nothing on failure (miss)
};

// Fighter special ability functions
export const fighterShieldSlam = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(4);
  user.damageMultiplierNextTurn = 0.5; // Reduce next incoming damage by half
};

export const fighterPowerStrike = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 10) + 2; // Roll 0-10 and add 2
  target.takeDamage(damage);
};

// Barbarian special ability functions
export const barbarianBloodSacrifice = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  user.takeDamage(5); // Self damage
  target.takeDamage(16);
};

export const barbarianBerserkerFury = (
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
export const paladinDivineSmite = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 8) + 4; // Roll 0-8 and add 4
  target.takeDamage(damage);
};

export const paladinLayOnHands = (
  user: CharacterCard,
  _target: CharacterCard
): void => {
  user.heal(10);
};

// Archer special ability functions
export const archerPiercingShot = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 8) + 4; // Roll 0-8 and add 4
  target.takeDamage(damage);
};

export const archerVolley = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const roll1 = rollDamage(0, 4); // Roll 0-4
  const roll2 = rollDamage(0, 4); // Roll 0-4
  const roll3 = rollDamage(0, 4); // Roll 0-4
  const damage = roll1 + roll2 + roll3;
  target.takeDamage(damage);
};

// Rogue special ability functions
export const rogueAssassinate = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  performChanceEffect(0.7, () => {
    target.takeDamage(12); // 70% chance to hit
  });
};

export const rogueDoubleStab = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const roll1 = rollDamage(0, 8); // Roll 0-8
  const roll2 = rollDamage(0, 8); // Roll 0-8
  const damage = roll1 + roll2;
  target.takeDamage(damage);
};

// Monk special ability functions
export const monkFlurryOfBlows = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const roll1 = rollDamage(0, 6); // Roll 0-6
  const roll2 = rollDamage(0, 6); // Roll 0-6
  const roll3 = rollDamage(0, 6); // Roll 0-6
  const damage = Math.max(roll1, roll2, roll3);
  target.takeDamage(damage);
};

export const monkInnerPeace = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(6);
  user.heal(6);
};

// Mage special ability functions
export const mageFireball = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  performChanceEffect(0.6, () => {
    target.takeDamage(14); // 60% chance to hit
  });
};

export const mageArcaneBlast = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 12) + 2; // Roll 0-12 and add 2
  target.takeDamage(damage);
};

// Necromancer special ability functions
export const necromancerLifeDrain = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(8);
  user.heal(4);
};

export const necromancerDarkRitual = (
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
export const healerRejuvenation = (
  user: CharacterCard,
  _target: CharacterCard
): void => {
  user.heal(12);
};

export const healerSoothingRain = (
  user: CharacterCard,
  _target: CharacterCard
): void => {
  const healAmount = rollDamage(0, 8) + 2; // Roll 0-8 and add 2
  user.heal(healAmount);
};
