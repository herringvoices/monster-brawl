import { useState, useEffect, useRef, useCallback } from "react";
import GameIntro from "./components/GameIntro";
import HeroChoice from "./components/HeroChoice";
import GameBoard from "./components/GameBoard";
import MonsterActionOverlay from "./components/MonsterActionOverlay";
import { HeroCard } from "./classes/HeroCard";
import { MonsterCard } from "./classes/MonsterCard";
import { ActionCard } from "./classes/ActionCard";
import { getMonsterDeck } from "./classes/monsterCards";
import { buildStandardActionDeck } from "./classes/ActionCardFactory";
import { EffectMessage } from "./components/CharacterCard";
import { EffectResult } from "./classes/CharacterCard";
import "./App.css";

// Turn state type definition
type TurnState =
  | "hero-draw"
  | "hero-wait" // waiting on user input
  | "hero-resolving" // effect is resolving
  | "monster-draw"
  | "monster-resolving"
  | "check-victory"
  | "end";

function App() {
  // Game state
  const [gameState, setGameState] = useState<"intro" | "heroChoice" | "game">(
    "intro"
  );
  const [hero, setHero] = useState<HeroCard | null>(null);
  const [monster, setMonster] = useState<MonsterCard | null>(null);

  // Turn state management
  const [turn, setTurn] = useState<TurnState>("hero-draw");
  const [turnCount, setTurnCount] = useState<number>(1);

  // Effect overlays
  const [heroEffect, setHeroEffect] = useState<EffectMessage | null>(null);
  const [monsterEffect, setMonsterEffect] = useState<EffectMessage | null>(
    null
  );

  // Use the standard action deck for both hero and monster
  const [allCards] = useState<ActionCard[]>(() => {
    return buildStandardActionDeck();
  });

  // Hero card decks - simplified to just track the draw deck and hand cards
  const [drawDeck, setDrawDeck] = useState<ActionCard[]>([]);
  const [handCards, setHandCards] = useState<ActionCard[]>([]);

  // Monster card deck (separate from hero's deck)
  const [monsterDeck, setMonsterDeck] = useState<ActionCard[]>([]);
  const [showMonsterActionOverlay, setShowMonsterActionOverlay] =
    useState(false);
  const [selectedMonsterCard, setSelectedMonsterCard] =
    useState<ActionCard | null>(null);

  // Animation states
  const [isDrawingCards, setIsDrawingCards] = useState<boolean>(false);

  // Game over message and reset functionality
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);

  // Reference to store the currently selected card for effect resolution
  const selectedCardRef = useRef<ActionCard | null>(null);

  // Helper function to shuffle the deck
  const shuffleDeck = (deck: ActionCard[]): ActionCard[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Helper function to display effect overlays
  const showEffect = (effect: EffectResult, isHero: boolean) => {
    const effectMessage: EffectMessage = {
      message: effect.message,
      type: effect.effectType as "damage" | "heal" | "defense",
    };

    if (isHero) {
      setHeroEffect(effectMessage);
    } else {
      setMonsterEffect(effectMessage);
    }

    // Return a promise that resolves when the effect animation completes
    return new Promise<void>((resolve) => {
      // We'll resolve this promise when the effect animation completes
      // via the onHeroEffectComplete or onMonsterEffectComplete callbacks
      setTimeout(() => {
        resolve();
      }, 1500); // Match animation duration
    });
  };

  // Handle effect completion
  const handleHeroEffectComplete = useCallback(() => {
    setHeroEffect(null);
  }, []);

  const handleMonsterEffectComplete = useCallback(() => {
    setMonsterEffect(null);
  }, []);

  // Handle Game Reset
  const handleResetGame = () => {
    // Reset game state to go back to hero selection screen
    setGameState("heroChoice");

    // Reset all game variables
    setGameOverMessage(null);
    setTurn("hero-draw");
    setTurnCount(1);
    setHandCards([]);
    setDrawDeck([]);
    setMonsterDeck([]);
    setSelectedMonsterCard(null);
    setIsDrawingCards(false);
    setHeroEffect(null);
    setMonsterEffect(null);

    // Reset hero and monster to null (they will be selected again)
    setHero(null);
    setMonster(null);
  };

  // Initialize the game decks when game starts
  useEffect(() => {
    if (gameState === "game" && allCards.length > 0) {
      // Shuffle the hero deck
      const heroShuffled = shuffleDeck(allCards);
      setDrawDeck(heroShuffled);
      setHandCards([]);

      // Create and shuffle a separate monster deck
      const monsterShuffled = shuffleDeck([...allCards]);
      setMonsterDeck(monsterShuffled);
    }
  }, [gameState, allCards]);

  // Draw cards from the draw pile - simplified to just replace hand cards
  const drawCards = useCallback(
    (count: number) => {
      setIsDrawingCards(true);

      setDrawDeck((prevDeck) => {
        // If we don't have enough cards, create a new shuffled deck
        const sourceDeck =
          prevDeck.length < count ? shuffleDeck([...allCards]) : prevDeck;

        // Draw cards from the deck
        const cardsToDraw = Math.min(count, sourceDeck.length);
        const drawn = sourceDeck.slice(0, cardsToDraw);
        const remaining = sourceDeck.slice(cardsToDraw);

        // Replace hand with drawn cards
        setTimeout(() => {
          setHandCards(drawn);
          setIsDrawingCards(false);
        }, 300);

        // Return the remaining cards as the new draw deck
        return remaining;
      });
    },
    [allCards]
  );

  // Handle monster action card selection
  const handleMonsterCardSelected = useCallback((card: ActionCard) => {
    setSelectedMonsterCard(card);

    // Move the card to monster's discard pile (we just remove it now)
    setMonsterDeck((prev) => prev.filter((c) => c !== card));
  }, []);

  // Effect to handle turn state transitions
  useEffect(() => {
    if (gameState !== "game" || !hero || !monster) return;

    const turnTransition = async () => {
      switch (turn) {
        case "hero-draw": {
          // Draw 3 cards from the deck
          setTimeout(() => {
            drawCards(3);

            // Transition to hero-wait after drawing completes plus some time for animation
            setTimeout(() => setTurn("hero-wait"), 800);
          }, 500); // Small delay before starting to draw cards
          break;
        }

        case "hero-wait":
          // No automatic transition - waits for player input
          break;

        case "hero-resolving": {
          // Apply the selected card's effect
          if (selectedCardRef.current && hero && monster) {
            try {
              // Apply the card effect and get the effect result
              const effectResult = selectedCardRef.current.executeEffect(
                hero,
                monster
              );

              // Show the effect on the appropriate character
              if (effectResult.effectType === "damage") {
                // Show damage effect on monster
                await showEffect(effectResult, false);
              } else if (effectResult.effectType === "heal") {
                // Show healing effect on hero
                await showEffect(effectResult, true);
              } else if (effectResult.effectType === "defense") {
                // Show defense effect on hero
                await showEffect(effectResult, true);
              }

              // Check if monster is dead after effect
              if (monster.isDead()) {
                // Update monster state
                setMonster(
                  Object.assign(Object.create(Object.getPrototypeOf(monster)), {
                    ...monster,
                  })
                );

                // Skip to victory check
                setTimeout(() => setTurn("check-victory"), 500);
                return;
              }

              // Update the monster state with a fresh instance to preserve class prototype
              setMonster(
                Object.assign(Object.create(Object.getPrototypeOf(monster)), {
                  ...monster,
                })
              );

              // Update the hero state with a fresh instance to preserve class prototype
              setHero(
                Object.assign(Object.create(Object.getPrototypeOf(hero)), {
                  ...hero,
                })
              );
            } catch (error) {
              console.error("Error applying card effect:", error);
            }

            // Clear the selected card reference
            selectedCardRef.current = null;
          }

          // Directly transition to monster's turn after a short delay
          // This replaces the previous transition to hero-animating
          setTimeout(() => setTurn("monster-draw"), 1000);
          break;
        }

        case "monster-draw": {
          // Check if monster deck needs reshuffling
          if (monsterDeck.length === 0) {
            // Create a new shuffled deck from all available cards
            const freshDeck = shuffleDeck([...allCards]);

            // Update monster deck state
            setMonsterDeck(freshDeck);
          }

          // Short delay to allow state update before activating overlay
          setTimeout(() => {
            setShowMonsterActionOverlay(true);

            // Transition to resolving phase after a delay to allow the overlay animation to play
            setTimeout(() => {
              setTurn("monster-resolving");
              setShowMonsterActionOverlay(false);
            }, 2500);
          }, 300);
          break;
        }

        case "monster-resolving": {
          // Apply the selected monster card's effect
          if (selectedMonsterCard && hero && monster) {
            let isHeroAlive = true;

            try {
              // Apply the card effect and get the effect result
              const effectResult = selectedMonsterCard.executeEffect(
                monster,
                hero
              );

              // Show the effect on the appropriate character
              if (effectResult.effectType === "damage") {
                // Show damage effect on hero
                await showEffect(effectResult, true);
              } else if (effectResult.effectType === "heal") {
                // Show healing effect on monster
                await showEffect(effectResult, false);
              } else if (effectResult.effectType === "defense") {
                // Show defense effect on monster
                await showEffect(effectResult, false);
              }

              // Check if hero died
              isHeroAlive = !hero.isDead();

              // Update hero and monster with fresh instances
              setHero(
                Object.assign(Object.create(Object.getPrototypeOf(hero)), {
                  ...hero,
                })
              );

              setMonster(
                Object.assign(Object.create(Object.getPrototypeOf(monster)), {
                  ...monster,
                })
              );

              // Clear the selected monster card
              setSelectedMonsterCard(null);

              // Check if hero died from the attack
              if (!isHeroAlive) {
                setTimeout(() => setTurn("check-victory"), 500);
                return;
              }
            } catch (error) {
              console.error("Error applying monster action:", error);
            }
          }

          // Directly transition to check-victory after a short delay
          // This replaces the previous transition to monster-animating
          setTimeout(() => setTurn("check-victory"), 1000);
          break;
        }

        case "check-victory": {
          // Check if either side has won using the isDead method
          let gameEnded = false;
          let victoryMessage = "";

          if (hero && hero.isDead()) {
            gameEnded = true;
            victoryMessage = "Monster wins! You were defeated!";
            setGameOverMessage(victoryMessage);
          } else if (monster && monster.isDead()) {
            gameEnded = true;
            victoryMessage = "You win! The monster was defeated!";
            setGameOverMessage(victoryMessage);
          }

          if (gameEnded) {
            // Handle game end
            setTurn("end");
          } else {
            // Start a new turn if game continues - increment turn counter and go to hero draw phase
            setTurnCount((prev) => prev + 1);

            // Important: Add a short delay before transitioning to prevent state update conflicts
            setTimeout(() => {
              setTurn("hero-draw");
            }, 300);
          }
          break;
        }

        case "end":
          // Game over state shows victory message and play again button
          break;
      }
    };

    turnTransition();
  }, [
    turn,
    gameState,
    hero,
    monster,
    turnCount,
    drawCards,
    allCards,
    monsterDeck.length,
    selectedMonsterCard,
  ]);

  // Handler for when the intro screen "Start Game" button is clicked
  const handleStartGame = () => {
    setGameState("heroChoice");
  };

  // Handler for when a hero is selected
  const handleHeroSelected = (selectedHero: HeroCard) => {
    setHero(selectedHero);

    // Generate a random monster - always using a fresh copy from getMonsterDeck()
    const monsters = getMonsterDeck(); // This always returns fresh copies with full health
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    setMonster(randomMonster);

    // Change to game state
    setGameState("game");
  };

  // Handler for hero action card selection
  const handleCardSelected = (card: ActionCard) => {
    // Store the selected card in the ref for effect resolution
    selectedCardRef.current = card;

    // Clear the entire hand immediately - ActionCardBar will handle the animation
    setHandCards([]);

    // Transition to resolving phase
    setTurn("hero-resolving");
  };

  return (
    <>
      {gameState === "intro" && <GameIntro onStartGame={handleStartGame} />}

      {gameState === "heroChoice" && (
        <HeroChoice onHeroSelected={handleHeroSelected} />
      )}

      {gameState === "game" && hero && monster && (
        <div className="game-container">
          <GameBoard
            hero={hero}
            monster={monster}
            handCards={handCards}
            onCardSelected={handleCardSelected}
            turnPhase={turn}
            gameOverMessage={gameOverMessage}
            onPlayAgain={handleResetGame}
            heroEffect={heroEffect}
            monsterEffect={monsterEffect}
            onHeroEffectComplete={handleHeroEffectComplete}
            onMonsterEffectComplete={handleMonsterEffectComplete}
            turnCount={turnCount}
            drawDeck={drawDeck}
            monsterDeck={monsterDeck}
            showMonsterActionOverlay={showMonsterActionOverlay}
            selectedMonsterCard={selectedMonsterCard}
            isDrawingCards={isDrawingCards}
            selectedCardRef={selectedCardRef}
          />

          {showMonsterActionOverlay && (
            <MonsterActionOverlay
              isActive={showMonsterActionOverlay}
              actionCards={
                monsterDeck.length > 0 ? monsterDeck.slice(0, 1) : []
              }
              onActionSelected={handleMonsterCardSelected}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
