import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CharacterCard from "./CharacterCard";
import { HeroCard } from "../classes/HeroCard";
import { getHeroDeck } from "../classes/heroCards";
import "../styles/CardFlip.css";

interface HeroChoiceProps {
  onHeroSelected: (hero: HeroCard) => void;
}

const HeroChoice: React.FC<HeroChoiceProps> = ({ onHeroSelected }) => {
  // Three random heroes to choose from
  const [heroes, setHeroes] = useState<HeroCard[]>([]);

  // Animation states
  const [cardsVisible, setCardsVisible] = useState<boolean>(false);
  const [cardsFlipped, setCardsFlipped] = useState<boolean>(false);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number | null>(
    null
  );
  const [flyOffScreen, setFlyOffScreen] = useState<boolean>(false);

  // Get three random heroes on component mount
  useEffect(() => {
    const heroDeck = getHeroDeck();
    const shuffled = [...heroDeck].sort(() => 0.5 - Math.random());
    setHeroes(shuffled.slice(0, 3));

    // Sequence for animations
    const showCards = setTimeout(() => {
      setCardsVisible(true);

      const flipCards = setTimeout(() => {
        setCardsFlipped(true);
      }, 1000);

      return () => clearTimeout(flipCards);
    }, 500);

    return () => clearTimeout(showCards);
  }, []);

  // Handle hero selection
  const handleHeroSelect = (hero: HeroCard, index: number) => {
    setSelectedHeroIndex(index);

    // Animation sequence
    setTimeout(() => {
      setFlyOffScreen(true);

      // Wait for fly-off animation to complete before unmounting
      setTimeout(() => {
        onHeroSelected(hero);
      }, 800);
    }, 500);
  };

  // Determine card animation styles
  const getCardStyle = (index: number) => {
    // Initial state - cards should be below the screen
    if (!cardsVisible) {
      return {
        transform: "translateY(100vh)",
        opacity: 0,
      };
    }

    // Selected card flies off to the top, others to the bottom
    if (flyOffScreen) {
      if (selectedHeroIndex === index) {
        return {
          transform: "translateY(-100vh) scale(0.8)",
          opacity: 0,
        };
      } else {
        return {
          transform: "translateY(100vh) scale(0.8)",
          opacity: 0,
        };
      }
    }

    // Normal visible state with a staggered entrance
    return {
      transform: "translateY(0)",
      opacity: 1,
      transitionDelay: `${index * 0.2}s`,
    };
  };

  return (
    <Container fluid className="hero-choice-container">
      <h2>Choose Your Hero</h2>
      <Row className="justify-content-center">
        {heroes.map((hero, index) => (
          <Col
            key={hero.name}
            xs={12}
            md={4}
            className="d-flex justify-content-center mb-5"
          >
            <div
              style={{
                ...getCardStyle(index),
                transition:
                  "transform 0.8s ease-in-out, opacity 0.8s ease-in-out",
              }}
              onClick={() => cardsFlipped && handleHeroSelect(hero, index)}
              className={`hero-card-container ${
                cardsFlipped ? "selectable" : ""
              }`}
            >
              <CharacterCard
                card={hero}
                backImage="/hero-card-back.png"
                isHero={true}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HeroChoice;
