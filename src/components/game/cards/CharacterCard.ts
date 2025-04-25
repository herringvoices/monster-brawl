// ----------------------------------------------------------------------------
// 3) Abstract base class: shared logic for heroes & monsters
// ----------------------------------------------------------------------------
import { ICharacterCard, SpecialAbilityFn } from "./types";

export interface EffectResult {
  effectType: "damage" | "heal" | "defense";
  value: number;
  message: string;
}

export abstract class CharacterCard implements ICharacterCard {
  public name: string;
  public imagePath: string;
  public maxHealth: number;
  public currentHealth: number;
  public attackRange: [number, number];
  public damageMultiplierNextTurn: number = 1;
  public damageSubtractorNextTurn: number = 0;
  public specialTitles: string[];
  public specialDescriptions: string[];
  public specialAbilities: SpecialAbilityFn[];

  /**
   * @param name                Card name
   * @param maxHealth           Maximum hit points
   * @param attackRange         [min, max] for basic attack
   * @param specialAbilities    Array of two ability functions
   * @param specialTitles       Array of titles for special abilities (e.g. "Shield Slam")
   * @param specialDescriptions Array of descriptions for special abilities
   */
  constructor(
    name: string,
    maxHealth: number,
    attackRange: [number, number],
    specialAbilities: SpecialAbilityFn[],
    specialTitles: string[],
    specialDescriptions: string[]
  ) {
    this.name = name;
    // Generate the image path from the name (lowercase) for consistency
    this.imagePath = `/${name.toLowerCase()}.png`;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth; // start at full health
    this.attackRange = attackRange;
    this.specialAbilities = specialAbilities;
    this.specialTitles = specialTitles;
    this.specialDescriptions = specialDescriptions;
  }

  /**
   * Check if the character is dead (HP <= 0)
   * @returns true if character is dead, false if alive
   */
  public isDead(): boolean {
    return this.currentHealth <= 0;
  }

  /**
   * Apply incoming damage (with modifiers), clamp HP ≥ 0,
   * then reset modifiers back to defaults.
   * @returns Effect result with damage information and whether character is still alive
   */
  public takeDamage(amount: number): EffectResult {
    // 1) apply multiplier (e.g. 0.5 → half damage)
    let modified: number = amount * this.damageMultiplierNextTurn;
    // 2) subtract flat mitigation (e.g. 5)
    modified -= this.damageSubtractorNextTurn;
    // 3) prevent negative damage
    const damageTaken: number = Math.max(Math.round(modified), 0);

    // Store previous health to calculate actual damage taken
    const previousHealth: number = this.currentHealth;

    // 4) reduce health, never below zero
    this.currentHealth = Math.max(this.currentHealth - damageTaken, 0);

    // Calculate actual damage taken (might be less if at low health)
    const actualDamageTaken: number = previousHealth - this.currentHealth;

    // 5) reset modifiers for next turn
    this.damageMultiplierNextTurn = 1;
    this.damageSubtractorNextTurn = 0;

    // Return damage effect information
    return {
      effectType: "damage",
      value: actualDamageTaken,
      message: `-${actualDamageTaken} HP`,
    };
  }

  /**
   * Heal this card up to its maxHealth
   * @returns Effect result with healing information
   */
  public heal(amount: number): EffectResult {
    // Store previous health to calculate actual healing done
    const previousHealth: number = this.currentHealth;

    // heal up to maxHealth
    this.currentHealth = Math.min(this.currentHealth + amount, this.maxHealth);

    // Calculate actual healing done
    const actualHealingDone: number = this.currentHealth - previousHealth;

    // Return healing effect information
    return {
      effectType: "heal",
      value: actualHealingDone,
      message: `+${actualHealingDone} HP`,
    };
  }

  /**
   * Set defense modifiers for the next turn
   * @returns Effect result with defense information
   */
  public setDefenseModifiers(
    multiplier?: number,
    subtractor?: number
  ): EffectResult {
    let message: string = "";

    if (multiplier !== undefined && multiplier !== 1) {
      this.damageMultiplierNextTurn = multiplier;
      message += `×${multiplier} DMG `;
    }

    if (subtractor !== undefined && subtractor > 0) {
      this.damageSubtractorNextTurn = subtractor;
      message += `-${subtractor} DMG`;
    }

    return {
      effectType: "defense",
      value: subtractor || 0,
      message: message.trim(),
    };
  }
}
