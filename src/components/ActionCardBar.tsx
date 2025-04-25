import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ActionCard as ActionCardModel } from "../game/cards/ActionCard";
import ActionCardComponent from "./ActionCard";
import "./CardFlip.css";

interface ActionCardBarProps {
  handCards: ActionCardModel[];
  onCardSelected?: (card: ActionCardModel) => void;
}

const ActionCardBar: React.FC<ActionCardBarProps> = ({
  handCards: initialHandCards,
  onCardSelected,
}) => {
  // Use state to track local copies of the hand cards
  const [handCards, setHandCards] =
    useState<ActionCardModel[]>(initialHandCards);
  const [selectedCard, setSelectedCard] = useState<ActionCardModel | null>(
    null
  );
  const [flyAnimation, setFlyAnimation] = useState<boolean>(false);
  const [enterAnimation, setEnterAnimation] = useState<boolean>(false);

  // When new cards are provided, trigger the enter animation
  useEffect(() => {
    // Reset animations
    setSelectedCard(null);
    setFlyAnimation(false);

    // Set the cards but don't trigger entrance animation if there are no cards
    setHandCards(initialHandCards);

    if (initialHandCards.length > 0) {
      // Set enter animation to false first (to reset)
      setEnterAnimation(false);

      // Trigger the enter animation after a small delay
      setTimeout(() => {
        setEnterAnimation(true);
      }, 50);
    }
  }, [initialHandCards]);

  // Handle card selection with fly-off animation for all cards
  const handleCardSelection = (card: ActionCardModel) => {
    // Mark which card was selected
    setSelectedCard(card);

    // Trigger fly-off animation for all cards
    setFlyAnimation(true);

    // After animation, call the parent handler and clear local hand state
    setTimeout(() => {
      if (onCardSelected) {
        onCardSelected(card);
      }
      // Clear local hand cards state after animation completes
      setHandCards([]);
    }, 600); // Wait for animation to complete
  };

  return (
    <div
      className="action-card-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "25vh",
        padding: "10px",
        borderTop: "2px solid #ccc",
        backgroundColor: "#272217",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png')",
      }}
    >
      <Row className="h-100 align-items-center">
        <Col xs={12} className="d-flex justify-content-center">
          {handCards.length > 0 ? (
            <div className="d-flex justify-content-center">
              {handCards.map((card, index) => {
                const isSelected = selectedCard === card;

                // Calculate card position and style
                // - Initial state: Cards start below the screen (translateY(100vh))
                // - Enter animation: Cards move up to their position
                // - Selected: The selected card is highlighted
                // - Fly animation: All cards fly off in different directions
                const cardStyle = {
                  margin: "0 0.5rem", // mx-2 equivalent
                  transform: flyAnimation
                    ? `translateY(${100 + index * 30}vh) scale(0.8) rotate(${
                        (index - 1) * 25
                      }deg)`
                    : enterAnimation
                    ? "translateY(0)"
                    : "translateY(100vh)",
                  opacity: flyAnimation ? 0 : enterAnimation ? 1 : 0,
                  transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
                  transitionDelay: flyAnimation
                    ? `${index * 0.1}s`
                    : `${index * 0.15}s`,
                  zIndex: isSelected ? 10 : 5 - index,
                  boxShadow:
                    isSelected && !flyAnimation
                      ? "0 0 15px rgba(255,255,255,0.8)"
                      : "none",
                };

                return (
                  <div
                    key={`${card.name}-${index}`}
                    style={cardStyle}
                    className="mx-2"
                  >
                    <ActionCardComponent
                      card={card}
                      backImage="/action-card-back.png"
                      onCardSelected={() => handleCardSelection(card)}
                      size="small"
                      autoFlip={true}
                      flipDelay={400 + index * 200} // Stagger the flip animations
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ fontSize: "16px", color: "#ccc", margin: "auto" }}>
              Waiting for cards...
            </div>
          )}
        </Col>
      </Row>

      {/* Add animation keyframes */}
      <style>
        {`
        @keyframes flyIn {
          0% { transform: translateY(100vh); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes flyOut {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        `}
      </style>
    </div>
  );
};

export default ActionCardBar;
