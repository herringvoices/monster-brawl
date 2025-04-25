import React, { useState, useEffect } from "react";
import { Card, Row, Col, ListGroup, ProgressBar } from "react-bootstrap";
import { CharacterCard as CharacterCardModel } from "../components/game/cards/CharacterCard";
import EffectOverlay, { EffectType } from "./EffectOverlay";
import "./CardFlip.css";

export interface EffectMessage {
  message: string;
  type: EffectType;
}

type CharacterCardProps = {
  card: CharacterCardModel;
  backImage: string;
  isHero?: boolean; // Optional prop to indicate if it's a hero card
  flipped?: boolean; // Optional prop to control flipped state externally
  autoFlip?: boolean; // Whether card should automatically flip after a delay
  flipDelay?: number; // Delay in ms before auto-flipping
  effect?: EffectMessage | null; // Effect message to display
  onEffectComplete?: () => void; // Callback when effect animation is complete
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  card,
  backImage,
  isHero,
  flipped: externalFlipped,
  autoFlip = false,
  flipDelay = 0,
  effect = null,
  onEffectComplete,
}) => {
  // If flipped is provided as a prop, use it; otherwise use internal state
  const [internalFlipped, setInternalFlipped] = useState<boolean>(autoFlip);
  const flipped =
    externalFlipped !== undefined ? externalFlipped : internalFlipped;

  // Health percentage for the progress bar
  const healthPercentage = Math.max(
    0,
    Math.min(100, (card.currentHealth / card.maxHealth) * 100)
  );

  // Determine health bar variant based on health percentage
  const getHealthBarVariant = () => {
    if (healthPercentage > 66) return "success";
    if (healthPercentage > 33) return "warning";
    return "danger";
  };

  // Handle auto-flipping if enabled
  useEffect(() => {
    if (autoFlip && flipped) {
      const timer = setTimeout(() => {
        setInternalFlipped((prev) => !prev);
      }, flipDelay);

      return () => clearTimeout(timer);
    }
  }, [autoFlip, flipped, flipDelay]);

  const handleClick = () => {
    // Only toggle internal state if not controlled externally
    if (externalFlipped === undefined) {
      setInternalFlipped(!internalFlipped);
    }
  };

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {/* Effect Overlay */}
      {effect && (
        <EffectOverlay
          message={effect.message}
          type={effect.type}
          isActive={!!effect}
          onEffectComplete={onEffectComplete}
        />
      )}

      <div className={`flip-card-inner ${isHero ? "hero" : "monster"}`}>
        {/* — FRONT — */}
        <div className="flip-card-front">
          <Card className="text-center h-100">
            <Card.Header className={`${isHero ? "hero" : "monster"}`}>
              <Row className="align-items-center">
                <Col xs={12}>
                  <strong>{card.name}</strong>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      ❤︎ {card.currentHealth}/{card.maxHealth}
                    </span>
                    <span>
                      ⚔ {card.attackRange[0]}-{card.attackRange[1]}
                    </span>
                  </div>
                  <ProgressBar
                    now={healthPercentage}
                    variant={getHealthBarVariant()}
                    className="mt-1"
                    style={{ height: "10px" }}
                  />
                </Col>
              </Row>
            </Card.Header>
            <div className="card-img-container">
              <Card.Img
                variant="top"
                className={`${isHero ? "hero" : "monster"}`}
                src={card.imagePath}
                alt={card.name}
              />
            </div>
            <Card.Body className="p-0">
              <ListGroup>
                <ListGroup.Item className={`${isHero ? "hero" : "monster"}`}>
                  <strong>{card.specialTitles[0]}:</strong>{" "}
                  <span>{card.specialDescriptions[0]}</span>
                </ListGroup.Item>
                <ListGroup.Item className={`${isHero ? "hero" : "monster"}`}>
                  <strong>{card.specialTitles[1]}:</strong>{" "}
                  <span>{card.specialDescriptions[1]}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>

        {/* — BACK — */}
        <div className="flip-card-back">
          <Card className="h-100">
            <Card.Img
              src={backImage}
              alt="Card back"
              style={{ height: "100%", objectFit: "cover", borderRadius: "0" }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
