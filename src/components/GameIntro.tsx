import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro: React.FC<GameIntroProps> = ({ onStartGame }) => {
  return (
    <div className="game-intro-background">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-lg border-0 game-intro-card">
              <Card.Header
                as="h2"
                className="text-center bg-primary text-white py-3"
              >
                Monster Brawl
              </Card.Header>
              <Card.Body className="p-4">
                <Card.Title className="mb-4 text-center">
                  Welcome to Monster Brawl!
                </Card.Title>

                {/* Fixed nested paragraph issue by removing the outer <p> tags */}
                <div className="mb-3">
                  Monster Brawl is an exciting card game where you'll choose a
                  hero and battle against fearsome monsters in turn-based
                  combat.
                </div>

                <div className="mb-3">
                  <strong>Game Rules:</strong>
                </div>

                <ol className="mb-3">
                  <li>Choose one hero from three random options</li>
                  <li>Face off against a random monster</li>
                  <li>On your turn, draw 3 action cards and play one</li>
                  <li>
                    Use attack cards, special abilities, and healing to defeat
                    your opponent
                  </li>
                  <li>The monster will attack on its turn</li>
                  <li>Reduce your opponent's HP to zero to win!</li>
                </ol>

                <div className="mb-3">
                  Each hero has unique abilities and stats. Choose wisely and
                  develop a strategy to overcome the challenges ahead!
                </div>

                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onStartGame}
                    className="px-5"
                  >
                    Start Game
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameIntro;
