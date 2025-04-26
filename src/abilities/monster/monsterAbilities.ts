import { CharacterCard } from "../../classes/CharacterCard";

// Utility functions for common monster special ability operations
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

// Wolf special ability functions
export const wolfPackTactics = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const roll1 = rollDamage(0, 6); // Roll 0-6
  const roll2 = rollDamage(0, 6); // Roll 0-6
  const damage = roll1 + roll2;
  target.takeDamage(damage);
};

export const wolfPounce = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  performChanceEffect(0.8, () => {
    target.takeDamage(9); // 80% chance to hit
  });
};

// Snake special ability functions
export const snakeVenomStrike = (
  user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(6);
  user.heal(3);
};

export const snakeConstrict = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const damage = rollDamage(0, 8) + 2; // Roll 0-8 and add 2
  target.takeDamage(damage);
};

// Hawk special ability functions
export const hawkTalonDive = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  performChanceEffect(0.7, () => {
    target.takeDamage(12); // 70% chance to hit
  });
};

export const hawkSkystrike = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const roll1 = rollDamage(0, 4); // Roll 0-4
  const roll2 = rollDamage(0, 4); // Roll 0-4
  const roll3 = rollDamage(0, 4); // Roll 0-4
  const damage = roll1 + roll2 + roll3;
  target.takeDamage(damage);
};

// Bear special ability functions
export const bearMaul = (_user: CharacterCard, target: CharacterCard): void => {
  const damage = rollDamage(0, 10) + 2; // Roll 0-10 and add 2
  target.takeDamage(damage);
};

export const bearCrushingSwipe = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  target.takeDamage(8);
};

// Owl special ability functions
export const owlNightAmbush = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  const extraDamage = rollDamage(0, 5); // Roll 0-5
  const totalDamage = 5 + extraDamage;
  target.takeDamage(totalDamage);
};

export const owlSilentTalons = (
  _user: CharacterCard,
  target: CharacterCard
): void => {
  performChanceEffect(0.75, () => {
    target.takeDamage(10); // 75% chance to hit
  });
};
