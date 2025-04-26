import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { ActionCard as ActionCardModel } from "../classes/ActionCard";
import "../styles/CardFlip.css";

type ActionCardProps = {
  card: ActionCardModel;
  backImage: string;
  onCardSelected?: (card: ActionCardModel) => void;
  size?: "small" | "medium" | "large";
  flipped?: boolean; // Optional prop to control flipped state externally
  autoFlip?: boolean; // Whether card should automatically flip after a delay
  flipDelay?: number; // Delay in ms before auto-flipping
};

const ActionCard: React.FC<ActionCardProps> = ({
  card,
  backImage,
  onCardSelected,
  size = "medium",
  flipped: externalFlipped,
  autoFlip = false,
  flipDelay = 0,
}) => {
  // If flipped is provided as a prop, use it; otherwise use internal state
  const [internalFlipped, setInternalFlipped] = useState<boolean>(autoFlip);
  const flipped =
    externalFlipped !== undefined ? externalFlipped : internalFlipped;

  // Handle auto-flipping if enabled
  useEffect(() => {
    if (autoFlip && flipped) {
      const timer = setTimeout(() => {
        setInternalFlipped((prev) => !prev);
      }, flipDelay);

      return () => clearTimeout(timer);
    }
  }, [autoFlip, flipped, flipDelay]);

  // Size presets for different use cases
  const sizeStyles = {
    small: { width: "6rem", height: "9rem" },
    medium: { width: "12rem", height: "18rem" },
    large: { width: "16rem", height: "24rem" },
  };

  const handleClick = () => {
    // Only toggle internal state if not controlled externally
    if (externalFlipped === undefined) {
      setInternalFlipped(!internalFlipped);
      if (onCardSelected) {
        onCardSelected(card);
      }
    }
  };

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={handleClick}
      style={{
        ...sizeStyles[size],
        cursor: "pointer",
      }}
    >
      <div className="flip-card-inner action">
        {/* — FRONT — */}
        <div className="flip-card-front">
          <Card className="h-100 w-100 p-0">
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {/* Full-size image */}
              <Card.Img
                className="action"
                src={card.imagePath}
                alt={card.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/vite.svg"; // Fallback image
                }}
              />
            </div>
          </Card>
        </div>

        {/* — BACK — */}
        <div className="flip-card-back">
          <Card className="h-100 border-0">
            <Card.Img
              className="action"
              src={backImage}
              alt="Card back"
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
