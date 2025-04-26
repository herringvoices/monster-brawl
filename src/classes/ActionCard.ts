// ----------------------------------------------------------------------------
// Concrete class: holds our effect and can be extended if needed
// ----------------------------------------------------------------------------
import { ActionEffect, IActionCard } from "../interfaces/IActionCard";
import { CharacterCard, EffectResult } from "./CharacterCard";

export class ActionCard implements IActionCard {
  public name: string;
  public effect: ActionEffect;
  public description?: string;
  public imagePath: string;

  /**
   * @param name        Human‑readable name
   * @param effect      What happens when this card is used
   * @param description (optional) details or rules reminder
   */
  constructor(name: string, effect: ActionEffect, description?: string) {
    this.name = name;
    this.effect = effect;
    this.description = description;

    this.imagePath = `/${name}.png`;
  }

  /**
   * Execute the card effect and return the effect result
   */
  public executeEffect(
    user: CharacterCard,
    target: CharacterCard
  ): EffectResult {
    return this.effect(user, target);
  }
}
