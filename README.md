# Monster Brawl

Monster Brawl is a turn-based card game built with React, TypeScript, and Bootstrap where players choose a hero to battle against fearsome monsters.

## Game Overview

In Monster Brawl:

1. Choose a hero with unique abilities and stats from 9 different hero types
2. Battle against a randomly selected monster
3. Draw action cards and strategically use attacks, special abilities, and healing
4. Defeat your opponent by reducing their health to zero

## Features

- 9 unique heroes with different abilities, health points, and attack ranges
- Variety of monsters to battle against
- Action deck with attacks, defense, healing, and special abilities
- Turn-based combat system
- Animated card flips and effect overlays
- Responsive design with React Bootstrap

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Development Setup

Clone the repository, then:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start and you can access the application at:

```
http://localhost:5173/
```

## Project Structure

- `src/components/`: React UI components
- `src/game/cards/`: Game logic and card implementations
- `src/styles/`: CSS and SCSS stylesheets
- `public/`: Static assets including hero and monster images

## Technologies Used

- React
- TypeScript
- React Bootstrap
- Vite
- SCSS

## Game Rules

### Setup

1. Choose one hero from three randomly selected options
2. A random monster is selected as your opponent
3. Both start with full health points

### Turn Structure

**Hero Turn**

1. Draw 3 cards from the Action Deck
2. Pick 1 to play and resolve its effect immediately
   - Basic Attack: Roll within your attack range
   - Use Special 1 or 2: Execute the respective special ability
   - Any other card: Resolve effect
3. Discard the other 2 cards

**Monster Turn**

1. Draw 1 card from the Monster Action Deck
2. Resolve its effect

### Victory Conditions

- Win by reducing your opponent's health to zero
- Lose if your health reaches zero

## Heroes

The game features 9 heroes:

- Fighter
- Paladin
- Healer
- Mage
- Rogue
- Archer
- Barbarian
- Monk
- Necromancer

Each hero has unique stats and special abilities.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
