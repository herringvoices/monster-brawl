// ----------------------------------------------------------------------------
// 4) Examples: building the standard 30‑card action deck
// ----------------------------------------------------------------------------
import { ActionCard } from "./ActionCard";
import { EffectResult } from "../../components/game/cards/CharacterCard";

// 4.1) Attack card: roll user.attackRange, deal that much to target
export const makeAttackCard = () =>
  new ActionCard(
    "attack", // Changed to lowercase to match image filename
    (user, target) => {
      // roll from user.attackRange[0] to user.attackRange[1]
      const [min, max] = user.attackRange;
      const damage = Math.floor(Math.random() * (max - min + 1)) + min;
      return target.takeDamage(damage);
    },
    "Roll 0–your attack max; deal that much damage."
  );

// 4.2) Defend card: roll and store mitigation for next turn
export const makeDefendCard = () =>
  new ActionCard(
    "defend", // Changed to lowercase to match image filename
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (user, _target) => {
      const [min, max] = user.attackRange;
      const block = Math.floor(Math.random() * (max - min + 1)) + min;
      // set flat subtractor for next incoming damage
      return user.setDefenseModifiers(undefined, block);
    },
    "Roll 0–your attack max; block that much damage next turn."
  );

// 4.3) Health Potion card: heal user 0–6
export const makeHealthPotionCard = () =>
  new ActionCard(
    "health-potion", // Changed to match image filename
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (user, _target) => {
      const healAmt = Math.floor(Math.random() * 7);
      return user.heal(healAmt);
    },
    "Heal 0–6 HP."
  );

// 4.4) Use Special 1 & Use Special 2: invoke the character's own abilities
export const makeUseSpecialCard = (index: 0 | 1) =>
  new ActionCard(
    `special${index + 1}`, // Changed to match image filename (special1.png or special2.png)
    (user, target) => {
      // Create a wrapper around specialAbilities that handles effect results
      const originalSpecial = user.specialAbilities[index];

      try {
        // We don't know if the special returns an effect result, so we need to track
        // health before and after to determine what happened
        const userHealthBefore = user.currentHealth;
        const targetHealthBefore = target.currentHealth;
        const userDefenseMultBefore = user.damageMultiplierNextTurn;
        const userDefenseSubBefore = user.damageSubtractorNextTurn;

        // Call the original special ability
        originalSpecial(user, target);

        // Determine what changed
        const userHealthDiff = user.currentHealth - userHealthBefore;
        const targetHealthDiff = target.currentHealth - targetHealthBefore;

        // Check if defense was modified
        if (
          user.damageMultiplierNextTurn !== userDefenseMultBefore ||
          user.damageSubtractorNextTurn !== userDefenseSubBefore
        ) {
          return {
            effectType: "defense",
            value: user.damageSubtractorNextTurn,
            message:
              user.damageMultiplierNextTurn !== 1
                ? `×${user.damageMultiplierNextTurn} DMG`
                : `-${user.damageSubtractorNextTurn} DMG`,
          } as EffectResult;
        }

        // Return a healing/damage effect if health changed
        if (userHealthDiff > 0) {
          return {
            effectType: "heal",
            value: userHealthDiff,
            message: `+${userHealthDiff} HP`,
          } as EffectResult;
        }

        if (targetHealthDiff < 0) {
          return {
            effectType: "damage",
            value: -targetHealthDiff,
            message: `-${-targetHealthDiff} HP`,
          } as EffectResult;
        }

        // Default effect if nothing else applies
        return {
          effectType: "damage",
          value: 0,
          message: "Miss!",
        } as EffectResult;
      } catch (error) {
        console.error("Error in special ability:", error);
        return {
          effectType: "damage",
          value: 0,
          message: "Error!",
        } as EffectResult;
      }
    },
    `Invoke your Special ${index + 1}.`
  );

// ----------------------------------------------------------------------------
// 5) Assemble a full action deck
// ----------------------------------------------------------------------------
export const buildStandardActionDeck = (): ActionCard[] => {
  const deck: ActionCard[] = [];
  // Attack ×10
  for (let i = 0; i < 10; i++) deck.push(makeAttackCard());
  // Defend ×7
  for (let i = 0; i < 7; i++) deck.push(makeDefendCard());
  // Health Potion ×4
  for (let i = 0; i < 4; i++) deck.push(makeHealthPotionCard());
  // Use Special 1 ×5
  for (let i = 0; i < 5; i++) deck.push(makeUseSpecialCard(0));
  // Use Special 2 ×4
  for (let i = 0; i < 4; i++) deck.push(makeUseSpecialCard(1));
  return deck;
};
