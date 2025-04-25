import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CharacterCard, { EffectMessage } from "./CharacterCard";
import ActionCardBar from "./ActionCardBar";
import { HeroCard } from "./game/cards/HeroCard";
import { MonsterCard } from "./game/cards/MonsterCard";
import { ActionCard } from "../game/cards/ActionCard";

// Import turn state type from App (or create a shared types file)
type TurnState =
  | "hero-draw"
  | "hero-wait"
  | "hero-resolving"
  | "monster-draw"
  | "monster-resolving"
  | "check-victory"
  | "end";

interface GameBoardProps {
  hero: HeroCard;
  monster: MonsterCard;
  handCards: ActionCard[];
  onCardSelected: (card: ActionCard) => void;
  turnPhase: TurnState;
  gameOverMessage?: string | null;
  onPlayAgain?: () => void;
  heroEffect?: EffectMessage | null; // Effect message for hero
  monsterEffect?: EffectMessage | null; // Effect message for monster
  onHeroEffectComplete?: () => void; // Callback when hero effect completes
  onMonsterEffectComplete?: () => void; // Callback when monster effect completes
  turnCount?: number;
  drawDeck?: ActionCard[];
  monsterDeck?: ActionCard[];
  showMonsterActionOverlay?: boolean;
  selectedMonsterCard?: ActionCard | null;
  isDrawingCards?: boolean;
  selectedCardRef?: React.RefObject<ActionCard | null>;
}

const GameBoard: React.FC<GameBoardProps> = ({
  hero,
  monster,
  handCards,
  onCardSelected,
  turnPhase,
  gameOverMessage = null,
  onPlayAgain,
  heroEffect = null,
  monsterEffect = null,
  onHeroEffectComplete,
  onMonsterEffectComplete,
}) => {
  // Handle turn phase changes
  useEffect(() => {
    // Turn overlay logic removed
  }, [turnPhase]);

  return (
    <Container
      fluid
      className="p-0"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Drawing cards indicator removed */}

      <div style={{ height: "80vh", overflow: "auto" }}>
        {/* Game over message */}
        {gameOverMessage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 200,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            }}
          >
            <div
              style={{
                background: `linear-gradient(to bottom, ${
                  hero.isDead() ? "#5c0000" : "#00500c"
                }, #000000)`,
                color: "white",
                padding: "30px",
                borderRadius: "15px",
                textAlign: "center",
                maxWidth: "500px",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                border: `4px solid ${hero.isDead() ? "#ff6b6b" : "#4caf50"}`,
                animation: "pulse-border 2s infinite",
              }}
            >
              <h1 className="mb-4">{hero.isDead() ? "Defeat!" : "Victory!"}</h1>
              <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                {gameOverMessage}
              </p>

              <div
                className="d-flex justify-content-around"
                style={{ margin: "20px 0" }}
              >
                <div className="text-center">
                  <h4>{hero.name}</h4>
                  <p>
                    HP: {hero.currentHealth}/{hero.maxHealth}
                  </p>
                </div>
                <div className="text-center">
                  <h4>{monster.name}</h4>
                  <p>
                    HP: {monster.currentHealth}/{monster.maxHealth}
                  </p>
                </div>
              </div>

              {onPlayAgain && (
                <Button
                  variant={hero.isDead() ? "danger" : "success"}
                  size="lg"
                  onClick={onPlayAgain}
                  className="mt-4 px-5 py-3"
                  style={{
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Play Again
                </Button>
              )}
            </div>
            <style>
              {`
                @keyframes pulse-border {
                  0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
                  50% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.7); }
                  100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
                }
              `}
            </style>
          </div>
        )}

        <Container className="p-4">
          <Row className="justify-content-around">
            <Col
              xs={12}
              md="auto"
              className="mb-3 d-flex justify-content-center"
            >
              <CharacterCard
                card={hero}
                backImage="/hero-card-back.png"
                isHero={true}
                autoFlip={true}
                flipDelay={500}
                effect={heroEffect}
                onEffectComplete={onHeroEffectComplete}
              />
            </Col>
            <Col
              xs={12}
              md="auto"
              className="mb-3 d-flex justify-content-center"
            >
              <CharacterCard
                card={monster}
                backImage="/monster-card-back.png"
                isHero={false}
                autoFlip={true}
                flipDelay={800}
                effect={monsterEffect}
                onEffectComplete={onMonsterEffectComplete}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Action Card Bar that takes 1/5 of screen height - Simplified */}
      <ActionCardBar handCards={handCards} onCardSelected={onCardSelected} />

      {/* Add a pulse animation to the stylesheet */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
        `}
      </style>
    </Container>
  );
};

export default GameBoard;
