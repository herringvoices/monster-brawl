import React, { useState, useEffect, useCallback, useRef } from "react";
import { Modal } from "react-bootstrap";
import ActionCard from "./ActionCard";
import { ActionCard as ActionCardModel } from "../classes/ActionCard";
import "../styles/MonsterActionOverlay.css";

interface MonsterActionOverlayProps {
  isActive: boolean;
  onActionSelected: (card: ActionCardModel) => void;
  actionCards: ActionCardModel[];
}

const MonsterActionOverlay: React.FC<MonsterActionOverlayProps> = ({
  isActive,
  onActionSelected,
  actionCards,
}) => {
  const [selectedCard, setSelectedCard] = useState<ActionCardModel | null>(
    null
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // Add a ref to track if we've already processed a card for this active state
  const processedRef = useRef<boolean>(false);

  // Select a random card from the available action cards
  const selectRandomCard = useCallback(() => {
    if (actionCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * actionCards.length);
    return actionCards[randomIndex];
  }, [actionCards]);

  // Show the overlay with the card
  const showOverlay = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Hide the overlay and reset state
  const hideOverlay = useCallback(() => {
    setIsVisible(false);
    setSelectedCard(null);
  }, []);

  // Process card selection: select card and notify parent
  const processCardSelection = useCallback(
    (card: ActionCardModel) => {
      setSelectedCard(card);
      onActionSelected(card);
    },
    [onActionSelected]
  );

  // Start animation sequence: show overlay, then hide
  const startAnimationSequence = useCallback(() => {
    // Select a random card
    const randomCard = selectRandomCard();

    if (randomCard) {
      // Set the selected card
      setSelectedCard(randomCard);
      processCardSelection(randomCard);

      // Show the overlay
      showOverlay();

      // Hide the overlay after showing the card for a moment
      // This allows time for the card to be shown and auto-flipped
      const hideTimer = setTimeout(() => {
        hideOverlay();
      }, 2500); // Adjusted to account for the auto-flip delay

      return () => clearTimeout(hideTimer);
    }
  }, [showOverlay, hideOverlay, selectRandomCard, processCardSelection]);

  useEffect(() => {
    // Reset the processed flag when isActive changes to false
    if (!isActive) {
      processedRef.current = false;
      return;
    }

    // Only process a card if we haven't already for this active state
    if (isActive && actionCards.length > 0 && !processedRef.current) {
      // Mark as processed so we don't select multiple cards
      processedRef.current = true;

      // Start the animation sequence with card selection
      return startAnimationSequence();
    }
  }, [isActive, actionCards, startAnimationSequence]);

  if (!isVisible || !selectedCard) {
    return null;
  }

  return (
    <Modal
      show={isVisible}
      centered
      backdrop="static"
      className="monster-action-overlay"
    >
      <Modal.Header>
        <h3>Monster's Turn</h3>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <div className="monster-card-container">
          <ActionCard
            card={selectedCard}
            backImage="/action-card-back.png"
            size="large"
            autoFlip={true}
            flipDelay={1000}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MonsterActionOverlay;
